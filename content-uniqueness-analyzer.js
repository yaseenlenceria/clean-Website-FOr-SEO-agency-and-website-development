
const fs = require('fs');
const cheerio = require('cheerio');

console.log('📝 Starting Content Uniqueness & Value Analysis...\n');

function extractContentFingerprint(text) {
    // Create a content fingerprint for duplicate detection
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(word => word.length > 3)
        .slice(0, 50) // First 50 meaningful words
        .join(' ');
}

function analyzeContentUniqueness() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    const contentAnalysis = {};
    const duplicateContent = [];
    const thinContent = [];
    
    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            // Remove navigation, footer, and other boilerplate
            $('nav, footer, .navbar, .footer, script, style').remove();
            
            const mainContent = $('main, .content, .page-content, body').text();
            const words = mainContent.replace(/\s+/g, ' ').trim().split(' ').filter(word => word.length > 0);
            const fingerprint = extractContentFingerprint(mainContent);
            
            const analysis = {
                wordCount: words.length,
                characterCount: mainContent.length,
                fingerprint: fingerprint,
                headings: {
                    h1: $('h1').length,
                    h2: $('h2').length,
                    h3: $('h3').length
                },
                paragraphs: $('p').length,
                images: $('img').length,
                lists: $('ul, ol').length,
                uniqueWords: [...new Set(words.map(w => w.toLowerCase()))].length,
                readabilityScore: calculateReadabilityScore(words, $('p').length)
            };
            
            contentAnalysis[file] = analysis;
            
            // Check for thin content
            if (analysis.wordCount < 300) {
                thinContent.push({ file, wordCount: analysis.wordCount });
            }
            
        } catch (error) {
            console.error(`Error analyzing ${file}:`, error.message);
        }
    });
    
    // Check for duplicate content
    const fingerprints = {};
    Object.keys(contentAnalysis).forEach(file => {
        const fingerprint = contentAnalysis[file].fingerprint;
        if (fingerprints[fingerprint]) {
            duplicateContent.push({
                files: [fingerprints[fingerprint], file],
                similarity: 'High'
            });
        } else {
            fingerprints[fingerprint] = file;
        }
    });
    
    // Generate report
    generateContentReport(contentAnalysis, duplicateContent, thinContent);
    
    return { contentAnalysis, duplicateContent, thinContent };
}

function calculateReadabilityScore(words, paragraphCount) {
    if (paragraphCount === 0 || words.length === 0) return 0;
    
    const avgWordsPerSentence = words.length / paragraphCount;
    const avgSyllablesPerWord = words.reduce((sum, word) => sum + countSyllables(word), 0) / words.length;
    
    // Simplified Flesch Reading Ease
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, score));
}

function countSyllables(word) {
    word = word.toLowerCase();
    let count = 0;
    const vowels = 'aeiouy';
    let previousWasVowel = false;
    
    for (let i = 0; i < word.length; i++) {
        const isVowel = vowels.includes(word[i]);
        if (isVowel && !previousWasVowel) {
            count++;
        }
        previousWasVowel = isVowel;
    }
    
    if (word.endsWith('e')) count--;
    return Math.max(1, count);
}

function generateContentReport(analysis, duplicates, thinContent) {
    console.log('📊 CONTENT UNIQUENESS & VALUE REPORT\n');
    
    // Overall statistics
    const totalPages = Object.keys(analysis).length;
    const avgWordCount = Object.values(analysis).reduce((sum, a) => sum + a.wordCount, 0) / totalPages;
    const highQualityPages = Object.values(analysis).filter(a => a.wordCount > 500 && a.readabilityScore > 60).length;
    
    console.log('📈 OVERALL STATISTICS:');
    console.log(`   Total Pages: ${totalPages}`);
    console.log(`   Average Word Count: ${Math.round(avgWordCount)}`);
    console.log(`   High Quality Pages: ${highQualityPages} (${Math.round(highQualityPages/totalPages*100)}%)`);
    
    // Thin content report
    if (thinContent.length > 0) {
        console.log('\n⚠️  THIN CONTENT DETECTED:');
        thinContent.forEach(item => {
            console.log(`   ${item.file}: ${item.wordCount} words`);
        });
    } else {
        console.log('\n✅ No thin content detected');
    }
    
    // Duplicate content report
    if (duplicates.length > 0) {
        console.log('\n❌ DUPLICATE CONTENT DETECTED:');
        duplicates.forEach(item => {
            console.log(`   Similar: ${item.files.join(' ↔ ')}`);
        });
    } else {
        console.log('\n✅ No duplicate content detected');
    }
    
    // Page-by-page analysis
    console.log('\n📋 PAGE ANALYSIS:');
    console.log('Page\t\t\t\tWords\tRead.\tH1\tH2\tQuality');
    console.log('─'.repeat(70));
    
    Object.keys(analysis).forEach(page => {
        const a = analysis[page];
        const quality = getQualityRating(a);
        console.log(`${page.padEnd(30)}\t${a.wordCount}\t${a.readabilityScore.toFixed(0)}\t${a.headings.h1}\t${a.headings.h2}\t${quality}`);
    });
    
    console.log('\n🎯 CONTENT IMPROVEMENT RECOMMENDATIONS:');
    console.log('✅ Aim for 500+ words per page');
    console.log('✅ Readability score 60+ (easy to read)');
    console.log('✅ One H1 and multiple H2s per page');
    console.log('✅ Unique, valuable content for each page');
    console.log('✅ Include images, lists, and varied content types');
}

function getQualityRating(analysis) {
    let score = 0;
    
    // Word count score
    if (analysis.wordCount >= 1000) score += 3;
    else if (analysis.wordCount >= 500) score += 2;
    else if (analysis.wordCount >= 300) score += 1;
    
    // Readability score
    if (analysis.readabilityScore >= 70) score += 2;
    else if (analysis.readabilityScore >= 60) score += 1;
    
    // Structure score
    if (analysis.headings.h1 === 1) score += 1;
    if (analysis.headings.h2 >= 3) score += 1;
    if (analysis.paragraphs >= 5) score += 1;
    
    // Content variety
    if (analysis.images >= 1) score += 1;
    if (analysis.lists >= 1) score += 1;
    
    if (score >= 8) return '🟢 Excellent';
    if (score >= 6) return '🟡 Good';
    if (score >= 4) return '🟠 Fair';
    return '🔴 Poor';
}

// Run content analysis
analyzeContentUniqueness();
