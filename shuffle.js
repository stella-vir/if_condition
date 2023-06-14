

const commodity_winner_cat1 = [' Rises ', ' Increases ',  ' Incurs Gains ', ' Grows '];
const commodity_winner_cat2 = [' Rallies ', ' Surges ',  ' Soars ', ' Spikes '];
const commodity_loser_cat1 = [' Falls ', ' Dips ', ' Drops ', ' Sinks '];
const commodity_loser_cat2 = [' Slumps ', ' Plunges ', ' Descends ', ' Tumbles '];
const commodity_loser_cat3 = [' Crashes ', ' Collapses ', ' Crumbles ', ' Craters '];


const currency_winner_cat1 = [' Appreciates ', ]
const currency_winner_cat2 = [' Appreciates largely ']
const currency_loser_cat1 = [' Depreciates ']
const currency_loser_cat2 = [' Weekens ']


function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


function getTitle (category, append, prepend, name, change, random) {
    if (random == true) {
        var title = append + name + getRandomItem(category) + 'by ' + prepend + change + '%';
    } else {
        var title = append + name + ' ' + prepend + change + '%';
    }    
    return title
}

// -------TODO----------
function handleTopGainNLoss (ordered_stuff) {
    for(var i = 0; i<ordered_stuff.length; i++){
        if(i > 1){
            break;
        }
        var append = ' ';
        var prepend = '';
    
        if(i > 0){
            append = ', Followed By ';
        }
        // a_request.group.toUpperCase()
        switch (a_request_to_group_upper) {
            case 'COMMODITIES':
                if(ordered_stuff[i].change > 0){
                    prepend = '+';
                    if (ordered_stuff[i].change >= 5) {
                        if (append.length > 2) {
                            te_title += getTitle(commodity_winner_cat2, append, prepend, ordered_stuff[i], false);
                        } else {
                            te_title += getTitle(commodity_winner_cat2, append, prepend, ordered_stuff[i], true);
                        }
                    } else {
                        if (append.length > 2) {
                            te_title += getTitle(commodity_winner_cat1, append, prepend, ordered_stuff[i], false);
                        }  else {
                            te_title += getTitle(commodity_winner_cat1, append, prepend, ordered_stuff[i], true);
                        }        
                    }
                } else if(ordered_stuff[i].change < 0){
                    if (ordered_stuff[i].change <= -5) {
                        if (append.length > 2) {
                            te_title += getTitle(commodity_loser_cat2, append, prepend, ordered_stuff[i], false);
                        } else {
                            te_title += getTitle(commodity_loser_cat2, append, prepend, ordered_stuff[i], true);
                        }
                    } else {
                        if (append.length > 2) {
                            te_title += getTitle(commodity_loser_cat1, append, prepend, ordered_stuff[i], false);
                        }  else {
                            te_title += getTitle(commodity_loser_cat1, append, prepend, ordered_stuff[i], true);
                        }        
                    }
                }
            case 'CURRENCIES':
                if(ordered_stuff[i].change > 0) {
                    prepend = '+';
                    if (append.length > 2) {
                        te_title += getTitle(currency_winner_cat1, append, prepend, ordered_stuff[i], false);
                    }  else {
                        te_title += getTitle(currency_winner_cat1, append, prepend, ordered_stuff[i], true);
                    }
                } else if (ordered_stuff[i].change < 0) {
                    if (append.length > 2) {
                        te_title += getTitle(currency_loser_cat1, append, prepend, ordered_stuff[i], false);
                    }  else {
                        te_title += getTitle(currency_loser_cat1, append, prepend, ordered_stuff[i], true);
                    }
                }
        }
    console.log(te_title)
    return te_title
    }
}

function plain_english(name) {
    switch (name) {
        case 'EURUSD':
            name = 'Euro';
            break;
        case 'GBPUSD':
            name = 'British Pound';
            break;
        case 'AUDUSD':
            name = 'Australian Dollar';
            break;
        case 'NZDUSD':
            name = 'New Zealand Dollar';
            break;
        case 'USDJPY':
            name = 'Japanese Yen'; 
            break;
        case 'USDCNY':
            name = 'Chinese Yuan'; 
            break;
        case 'USDCHF':
            name = 'Swiss Franc'; 
            break;
        case 'USDCAD':
            name = 'Canadian Dollar';
            break; 
        case 'USDMXN':
            name = 'Mexican peso';
            break;
        case 'USDBRL':
            name = 'Brazilian Real';
            break;
        case 'USDRUB':
            name = 'Russian Ruble';
            break;
        case 'USDKRW':
            name = 'Korean Won';
            break;
        case 'USDTRY':
            name = 'Turkish Lira';
            break;
        case 'DXY':
            name = 'Dollar Index'; 
            break;
        default:
            name = name;
            break;
    }
    return name
}

function insert_title_by_category_currency(row_value, symbol, change) {
    console.log('insert_title_by_category_currency')
    append = ''
    prepend = ''
    const name = plain_english(symbol)
    if (change > 0) {
        prepend = '+'
        if (change >= 1) {
            te_title = getTitle(currency_winner_cat2, append, prepend, name, change, true)
        } else {
            te_title = getTitle(currency_winner_cat1, append, prepend, name, change, true)
        }    
    } else {
        if (change <= -1) {
            te_title = getTitle(currency_loser_cat2, append, prepend, name, change, true)
        } else {
            te_title = getTitle(currency_loser_cat1, append, prepend, name, change, true)
        }
    }
    row_value += ' ' + te_title
    // console.log(row_value)
    return row_value
}

function insert_title_by_category_commodity(row_value, symbol, change) {
    console.log('insert_title_by_category_commodity')
    append = ''
    prepend = ''
    const name = plain_english(symbol)
    if (change > 0) {
        prepend = '+'
        if (change >= 4) {
            te_title = getTitle(commodity_winner_cat2, append, prepend, name, change, true)
        } else {
            te_title = getTitle(commodity_winner_cat1, append, prepend, name, change, true)
        }
    } else {
        if (change <= -5) {
            te_title = getTitle(commodity_loser_cat2, append, prepend, name, change, true)
        } else {
            te_title = getTitle(commodity_loser_cat1, append, prepend, name, change, true)
        }
    }
    row_value += ' ' + te_title
    // console.log(row_value)
    return row_value
}

function read_csv(file, isCommodityFile) {
    console.log(isCommodityFile)
    const fs = require('fs');
    const csv = require('csv-parser');
    var allTitles = ''

    fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
    // console.log(row);
    row_value = row['commodity/fx'];
    // check if row_value is not undefined, i.e. defined, if so, .trim()
    const columns = row_value !== undefined ? row_value.trim().split('\t') : '';
    // console.log(columns);
    try {
        const symbol = columns[0];
        let change = columns[3];
        change = parseFloat(change.replace('%', ''));
        switch(isCommodityFile) {
            case true:
                var titles = insert_title_by_category_commodity(row_value, symbol, change);
                break;
            case false:
                var titles = insert_title_by_category_currency(row_value, symbol, change);
                break;
            default:
                console.log('Error occured @ inserting titles');
        }
        allTitles += titles
        allTitles += '\n'
        try {
            const csvLine = allTitles.split('% ').join('\t');
            console.log('csvLine ' + csvLine);
            switch(isCommodityFile) {
                case true:
                    fs.writeFileSync('commodity_output.csv', csvLine);
                    break;
                case false:
                    fs.writeFileSync('currency_output.csv', csvLine);
                    break;
                default:
                    console.log('Error occured @ writing into the files');
            }
        } catch (error) {
            console.error('Error occured @ writing into the files', error.message);
        }
      } catch (error) {
        console.error('Error occured @ columns or titles', error.message);
      }
   
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
}



let ordered_stuff

var a_request_to_group_upper = 'COMMODITIES'
/* te_title = 'Commodities Updates:'
ordered_stuff = [{"name":"France Electricity","change":0.1005,"abs_change":5.1005},{"name":"TTF Gas","change":5.01,"abs_change":5.01}] */

// var a_request_to_group_upper = 'CURRENCIES'
// te_title = 'FX Updates:'
// ordered_stuff = [{"name":"Zimbabwean RTGS Dollar","change":+87.9511,"abs_change":87.9511},{"name":"USDAOA","change":+3.38,"abs_change":3.38}]


switch (a_request_to_group_upper) {
    case 'COMMODITIES':
        read_csv('test_commodity.csv', true);
        break;
    case 'CURRENCIES':
        read_csv('test_currency.csv', false)
        break;
}

