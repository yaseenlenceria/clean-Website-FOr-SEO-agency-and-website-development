
const http = require('http');

console.log('🔍 Testing sitemap accessibility...\n');

// Test local sitemap file existence
const fs = require('fs');
if (fs.existsSync('sitemap.xml')) {
    console.log('✅ sitemap.xml file exists locally');
    
    // Read and validate content
    const content = fs.readFileSync('sitemap.xml', 'utf8');
    if (content.includes('<?xml version="1.0"') && content.includes('<urlset')) {
        console.log('✅ sitemap.xml has valid XML structure');
        
        // Count URLs
        const urlCount = (content.match(/<url>/g) || []).length;
        console.log(`✅ sitemap.xml contains ${urlCount} URLs`);
    } else {
        console.log('❌ sitemap.xml has invalid XML structure');
    }
} else {
    console.log('❌ sitemap.xml file not found');
}

// Test if sitemap is accessible via HTTP
const options = {
    hostname: 'localhost',
    port: 80,
    path: '/sitemap.xml',
    method: 'GET',
    headers: {
        'Accept': 'application/xml,text/xml,*/*'
    }
};

const req = http.request(options, (res) => {
    console.log(`\n📡 HTTP Response Status: ${res.statusCode}`);
    console.log(`📡 Content-Type: ${res.headers['content-type']}`);
    
    if (res.statusCode === 200) {
        console.log('✅ Sitemap is accessible via HTTP');
    } else {
        console.log('❌ Sitemap is not accessible via HTTP');
    }
});

req.on('error', (err) => {
    console.log(`❌ Request failed: ${err.message}`);
});

req.setTimeout(5000, () => {
    console.log('❌ Request timed out');
    req.destroy();
});

req.end();

// Instructions
console.log('\n📋 VERIFICATION STEPS:');
console.log('1. Check if your domain sitemap works: https://outsourcesu.com/sitemap.xml');
console.log('2. Submit to Google Search Console: https://search.google.com/search-console');
console.log('3. Test with sitemap validators: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
