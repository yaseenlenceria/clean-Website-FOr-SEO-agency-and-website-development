
// Google Apps Script Code (Deploy as Web App)
// Copy this code to Google Apps Script and deploy as a web app

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheetName;
    const rowData = data.data;
    
    const spreadsheetId = '1P2JdHNXFe-iDn8kEPuqUR_gBd3EPKbc9';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      
      // Add headers based on sheet type
      const headers = getHeadersForSheet(sheetName);
      if (headers.length > 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }
    
    // Add the data
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getHeadersForSheet(sheetName) {
  const headerMappings = {
    'PageViews': ['Timestamp', 'Page', 'Title', 'Referrer', 'User Agent', 'Session ID', 'User ID'],
    'ScrollTracking': ['Timestamp', 'Page', 'Scroll Depth', 'Session ID'],
    'ClickTracking': ['Timestamp', 'Page', 'Element Type', 'Element Text', 'Element Href', 'Session ID'],
    'TimeOnPage': ['Timestamp', 'Page', 'Time Spent (seconds)', 'Session ID'],
    'FormSubmissions': ['Timestamp', 'Page', 'Form ID', 'Form Action', 'Session ID'],
    'PhoneClicks': ['Timestamp', 'Page', 'Phone Number', 'Session ID'],
    'EmailClicks': ['Timestamp', 'Page', 'Email', 'Session ID'],
    'SearchQueries': ['Timestamp', 'Page', 'Search Term', 'Session ID'],
    'PagePerformance': ['Timestamp', 'Page', 'Load Time', 'DOM Content Loaded', 'First Paint', 'Session ID'],
    'DetailedFormSubmissions': ['Timestamp', 'Page', 'Form ID', 'Field Count', 'Form Method', 'Session ID']
  };
  
  return headerMappings[sheetName] || ['Timestamp', 'Data'];
}

function doGet(e) {
  return ContentService
    .createTextOutput("Analytics endpoint is working")
    .setMimeType(ContentService.MimeType.TEXT);
}
