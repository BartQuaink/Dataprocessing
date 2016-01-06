// selected colours
colours = ["#980808", "#f63535", "#e24210", "#f28d30", "#f6aa39", "#f1ef13", "#ebf702"];

// arbitrary legend sizes
var legend1 = 2000000;
var legend2 = 5000000;
var legend3 = 10000000;
var legend4 = 15000000;
var legend5 = 30000000;
var legend6 = 50000000;

// function
window.onload = function() {
    // get wanted data
    var data = document.getElementById("rawdata").innerHTML;
    data = JSON.parse(data);

    // create lists to store country and population
    var countrypopulation = [];

    // iterate over whole json list
    for (var i = 0; i < data.length; i++) {
      temp_list = [];
      temp_list.push(data[i][1]);
      temp_list.push(data[i][3]);
      countrypopulation.push(temp_list);
      temp_list = [];
    }

    // update list with the country code
    for (var abbr in countrypopulation) {
        var countrycode = GetCountryCode(countrypopulation[abbr][0]);
        countrypopulation[abbr].push(countrycode);
    }

    // time to color all the countries
    for (var count in countrypopulation) {
        if (countrypopulation[count][1] <= legend1 && contains(africountriesiso, countrypopulation[count][2])) {
          changeColor(countrypopulation[count][2], colours[6]);
        }
        else if (countrypopulation[count][1] <= legend2 && contains(africountriesiso, countrypopulation[count][2])) {
          changeColor(countrypopulation[count][2], colours[5]);
        }
        else if (countrypopulation[count][1] <= legend3 && contains(africountriesiso, countrypopulation[count][2])) {
          changeColor(countrypopulation[count][2], colours[4]);
        }
        else if (countrypopulation[count][1] <= legend4 && contains(africountriesiso, countrypopulation[count][2])) {
          changeColor(countrypopulation[count][2], colours[3]);
        }
        else if (countrypopulation[count][1] <= legend5 && contains(africountriesiso, countrypopulation[count][2])) {
          changeColor(countrypopulation[count][2], colours[2]);
        }
        else if (countrypopulation[count][1] <= legend6 && contains(africountriesiso, countrypopulation[count][2])) {
          changeColor(countrypopulation[count][2], colours[1]);
        }
        else if (countrypopulation[count][1] > legend6 && contains(africountriesiso, countrypopulation[count][2])) {
          changeColor(countrypopulation[count][2], colours[0]);
        }
    }
};

// changeColor takes a path ID and a color (hex value) and changes that path's fill color
function changeColor(id, color){
    document.getElementById(id).style.fill = color;
}

// function to check if it's an african country or not
function contains(africancountry, goal) {
    for (var i = 0; i < africancountry.length; i++) {
        if (africancountry[i] === goal) {
            return true;
        }
    }
    return false;
}

// create list containing all the african countries' iso alpha-2 codes.
var africountriesiso = ["dz", "ao", "sh", "bj", "bw", "bf", "bi", "cm", "cv", "cf", "td", "km", "cg", "dj", "eg", "gq", "er", "et", "ga", "gm", "gh", "gw", "gn", "ci", "ke", "ls", "lr", "ly", "mg", "mw", "ml", "mr", "mu", "yt", "ma", "mz", "na", "ne", "ng", "st", "re", "rw", "sn", "sc", "sl", "so", "za", "sh", "sd", "sz", "tz", "tg", "tn", "ug", "cd", "zm", "zw", "ss"];

// function to get the correspoding country code
function GetCountryCode(country) {
    var country_codes = [
        ["af", "AFG", "Afghanistan"],
        ["ax", "ALA", "Åland Islands"],
        ["al", "ALB", "Albania"],
        ["dz", "DZA", "Algeria"],
        ["as", "ASM", "American Samoa"],
        ["ad", "AND", "Andorra"],
        ["ao", "AGO", "Angola"],
        ["ai", "AIA", "Anguilla"],
        ["aq", "ATA", "Antarctica"],
        ["an", "ANT", "Netherlands Antilles"],
        ["ag", "ATG", "Antigua and Barbuda"],
        ["ar", "ARG", "Argentina"],
        ["am", "ARM", "Armenia"],
        ["aw", "ABW", "Aruba"],
        ["au", "AUS", "Australia"],
        ["at", "AUT", "Austria"],
        ["az", "AZE", "Azerbaijan"],
        ["bs", "BHS", "Bahamas"],
        ["bh", "BHR", "Bahrain"],
        ["bd", "BGD", "Bangladesh"],
        ["bb", "BRB", "Barbados"],
        ["by", "BLR", "Belarus"],
        ["be", "BEL", "Belgium"],
        ["bz", "BLZ", "Belize"],
        ["bj", "BEN", "Benin"],
        ["bm", "BMU", "Bermuda"],
        ["bt", "BTN", "Bhutan"],
        ["bo", "BOL", "Bolivia, Plurinational State of"],
        ["bq", "BES", "Bonaire, Sint Eustatius and Saba"],
        ["ba", "BIH", "Bosnia and Herzegovina"],
        ["bw", "BWA", "Botswana"],
        ["bv", "BVT", "Bouvet Island"],
        ["br", "BRA", "Brazil"],
        ["io", "IOT", "British Indian Ocean Territory"],
        ["bn", "BRN", "Brunei"],
        ["bg", "BGR", "Bulgaria"],
        ["bf", "BFA", "Burkina Faso"],
        ["bi", "BDI", "Burundi"],
        ["kh", "KHM", "Cambodia"],
        ["cm", "CMR", "Cameroon"],
        ["ca", "CAN", "Canada"],
        ["cv", "CPV", "Cape Verde"],
        ["ky", "CYM", "Cayman Islands"],
        ["cf", "CAF", "Central African Republic"],
        ["td", "TCD", "Chad"],
        ["cl", "CHL", "Chile"],
        ["cn", "CHN", "China"],
        ["cx", "CXR", "Christmas Island"],
        ["cc", "CCK", "Cocos (Keeling) Islands"],
        ["co", "COL", "Colombia"],
        ["km", "COM", "Comoros"],
        ["cg", "COG", "Congo"],
        ["cd", "COD", "The Democratic Republic of the Congo"],
        ["ck", "COK", "Cook Islands"],
        ["cr", "CRI", "Costa Rica"],
        ["ci", "CIV", "Cote d'Ivoire"],
        ["hr", "HRV", "Croatia"],
        ["cu", "CUB", "Cuba"],
        ["cw", "CUW", "Curaçao"],
        ["cy", "CYP", "Cyprus"],
        ["cz", "CZE", "Czech Republic"],
        ["dk", "DNK", "Denmark"],
        ["dj", "DJI", "Djibouti"],
        ["dm", "DMA", "Dominica"],
        ["do", "DOM", "Dominican Republic"],
        ["ec", "ECU", "Ecuador"],
        ["eg", "EGY", "Egypt"],
        ["sv", "SLV", "El Salvador"],
        ["gq", "GNQ", "Equatorial Guinea"],
        ["er", "ERI", "Eritrea"],
        ["ee", "EST", "Estonia"],
        ["et", "ETH", "Ethiopia"],
        ["fk", "FLK", "Falkland Islands"],
        ["fo", "FRO", "Faroe Islands"],
        ["fj", "FJI", "Fiji Islands"],
        ["fi", "FIN", "Finland"],
        ["fr", "FRA", "France"],
        ["gf", "GUF", "French Guiana"],
        ["pf", "PYF", "French Polynesia"],
        ["tf", "ATF", "French Southern Territories"],
        ["ga", "GAB", "Gabon"],
        ["gm", "GMB", "Gambia"],
        ["ge", "GEO", "Georgia"],
        ["de", "DEU", "Germany"],
        ["gh", "GHA", "Ghana"],
        ["gi", "GIB", "Gibraltar"],
        ["gr", "GRC", "Greece"],
        ["gl", "GRL", "Greenland"],
        ["gd", "GRD", "Grenada"],
        ["gp", "GLP", "Guadeloupe"],
        ["gu", "GUM", "Guam"],
        ["gt", "GTM", "Guatemala"],
        ["gg", "GGY", "Guernsey"],
        ["gn", "GIN", "Guinea"],
        ["gw", "GNB", "Guinea-Bissau"],
        ["gy", "GUY", "Guyana"],
        ["ht", "HTI", "Haiti"],
        ["hm", "HMD", "Heard Island and McDonald Islands"],
        ["va", "VAT", "Holy See (Vatican City State)"],
        ["hn", "HND", "Honduras"],
        ["hk", "HKG", "Hong Kong"],
        ["hu", "HUN", "Hungary"],
        ["is", "ISL", "Iceland"],
        ["in", "IND", "India"],
        ["id", "IDN", "Indonesia"],
        ["ir", "IRN", "Iran"],
        ["iq", "IRQ", "Iraq"],
        ["ie", "IRL", "Ireland"],
        ["im", "IMN", "Isle of Man"],
        ["il", "ISR", "Israel"],
        ["it", "ITA", "Italy"],
        ["jm", "JAM", "Jamaica"],
        ["jp", "JPN", "Japan"],
        ["je", "JEY", "Jersey"],
        ["jo", "JOR", "Jordan"],
        ["kz", "KAZ", "Kazakhstan"],
        ["ke", "KEN", "Kenya"],
        ["ki", "KIR", "Kiribati"],
        ["kp", "PRK", "North Korea"],
        ["kr", "KOR", "South Korea"],
        ["kw", "KWT", "Kuwait"],
        ["kg", "KGZ", "Kyrgyzstan"],
        ["la", "LAO", "Laos"],
        ["lv", "LVA", "Latvia"],
        ["lb", "LBN", "Lebanon"],
        ["ls", "LSO", "Lesotho"],
        ["lr", "LBR", "Liberia"],
        ["ly", "LBY", "Libya"],
        ["li", "LIE", "Liechtenstein"],
        ["lt", "LTU", "Lithuania"],
        ["lu", "LUX", "Luxembourg"],
        ["mo", "MAC", "Macao"],
        ["mk", "MKD", "Macedonia"],
        ["mg", "MDG", "Madagascar"],
        ["mw", "MWI", "Malawi"],
        ["my", "MYS", "Malaysia"],
        ["mv", "MDV", "Maldives"],
        ["ml", "MLI", "Mali"],
        ["mt", "MLT", "Malta"],
        ["mh", "MHL", "Marshall Islands"],
        ["mq", "MTQ", "Martinique"],
        ["mr", "MRT", "Mauritania"],
        ["mu", "MUS", "Mauritius"],
        ["yt", "MYT", "Mayotte"],
        ["mx", "MEX", "Mexico"],
        ["fm", "FSM", "Federated States of Micronesia"],
        ["md", "MDA", "Moldova"],
        ["mc", "MCO", "Monaco"],
        ["mn", "MNG", "Mongolia"],
        ["me", "MNE", "Montenegro"],
        ["ms", "MSR", "Montserrat"],
        ["ma", "MAR", "Morocco"],
        ["mz", "MOZ", "Mozambique"],
        ["mm", "MMR", "Myanmar"],
        ["na", "NAM", "Namibia"],
        ["nr", "NRU", "Nauru"],
        ["np", "NPL", "Nepal"],
        ["nl", "NLD", "Netherlands"],
        ["nc", "NCL", "New Caledonia"],
        ["nz", "NZL", "New Zealand"],
        ["ni", "NIC", "Nicaragua"],
        ["ne", "NER", "Niger"],
        ["ng", "NGA", "Nigeria"],
        ["nu", "NIU", "Niue"],
        ["nf", "NFK", "Norfolk Island"],
        ["mp", "MNP", "Northern Mariana Islands"],
        ["no", "NOR", "Norway"],
        ["om", "OMN", "Oman"],
        ["pk", "PAK", "Pakistan"],
        ["pw", "PLW", "Palau"],
        ["ps", "PSE", "Palestine"],
        ["pa", "PAN", "Panama"],
        ["pg", "PNG", "Papua New Guinea"],
        ["py", "PRY", "Paraguay"],
        ["pe", "PER", "Peru"],
        ["ph", "PHL", "Philippines"],
        ["pn", "PCN", "Pitcairn"],
        ["pl", "POL", "Poland"],
        ["pt", "PRT", "Portugal"],
        ["pr", "PRI", "Puerto Rico"],
        ["qa", "QAT", "Qatar"],
        ["re", "REU", "Reunion"],
        ["ro", "ROU", "Romania"],
        ["ru", "RUS", "Russian Federation"],
        ["rw", "RWA", "Rwanda"],
        ["bl", "BLM", "Saint Barthélemy"],
        ["sh", "SHN", "Saint Helena"],
        ["kn", "KNA", "Saint Kitts and Nevis"],
        ["lc", "LCA", "Saint Lucia"],
        ["mf", "MAF", "Saint Martin (French part)"],
        ["pm", "SPM", "Saint Pierre and Miquelon"],
        ["vc", "VCT", "Saint Vincent and the Grenadines"],
        ["ws", "WSM", "Samoa"],
        ["sm", "SMR", "San Marino"],
        ["st", "STP", "Sao Tome and Principe"],
        ["sa", "SAU", "Saudi Arabia"],
        ["sn", "SEN", "Senegal"],
        ["rs", "SRB", "Serbia"],
        ["sc", "SYC", "Seychelles"],
        ["sl", "SLE", "Sierra Leone"],
        ["sg", "SGP", "Singapore"],
        ["sx", "SXM", "Sint Maarten (Dutch part)"],
        ["sk", "SVK", "Slovakia"],
        ["si", "SVN", "Slovenia"],
        ["sb", "SLB", "Solomon Islands"],
        ["so", "SOM", "Somalia"],
        ["za", "ZAF", "South Africa"],
        ["gs", "SGS", "South Georgia and the South Sandwich Islands"],
        ["ss", "SSD", "South Sudan"],
        ["es", "ESP", "Spain"],
        ["lk", "LKA", "Sri Lanka"],
        ["sd", "SDN", "Sudan"],
        ["sr", "SUR", "Suriname"],
        ["sj", "SJM", "Svalbard and Jan Mayen"],
        ["sz", "SWZ", "Swaziland"],
        ["se", "SWE", "Sweden"],
        ["ch", "CHE", "Switzerland"],
        ["sy", "SYR", "Syria"],
        ["tw", "TWN", "Taiwan"],
        ["tj", "TJK", "Tajikistan"],
        ["tz", "TZA", "Tanzania"],
        ["th", "THA", "Thailand"],
        ["tl", "TLS", "East Timor"],
        ["tg", "TGO", "Togo"],
        ["tk", "TKL", "Tokelau"],
        ["to", "TON", "Tonga"],
        ["tt", "TTO", "Trinidad and Tobago"],
        ["tn", "TUN", "Tunisia"],
        ["tr", "TUR", "Turkey"],
        ["tm", "TKM", "Turkmenistan"],
        ["tc", "TCA", "Turks and Caicos Islands"],
        ["tv", "TUV", "Tuvalu"],
        ["ug", "UGA", "Uganda"],
        ["ua", "UKR", "Ukraine"],
        ["ae", "ARE", "United Arab Emirates"],
        ["gb", "GBR", "United Kingdom"],
        ["us", "USA", "United States"],
        ["um", "UMI", "United States Minor Outlying Islands"],
        ["uy", "URY", "Uruguay"],
        ["uz", "UZB", "Uzbekistan"],
        ["vu", "VUT", "Vanuatu"],
        ["ve", "VEN", "Venezuela"],
        ["vn", "VNM", "Vietnam"],
        ["vg", "VGB", "British Virgin Islands"],
        ["vi", "VIR", "United States Virgin Islands"],
        ["wf", "WLF", "Wallis and Futuna"],
        ["eh", "ESH", "Western Sahara"],
        ["ye", "YEM", "Yemen"],
        ["zm", "ZMB", "Zambia"],
        ["zw", "ZWE", "Zimbabwe"] ];

        // if the country matches the country in this list, return the country code
        for (var key in country_codes) {
            if (country_codes[key][2] == country) {
              return country_codes[key][0];
            }
        }
}
