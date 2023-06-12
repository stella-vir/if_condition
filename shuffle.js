

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


const commodity_winner_cat1 = [' Rises ', ' Increases ',  ' Incurs Gains ', ' Grows '];
const commodity_winner_cat2 = [' Rallies ', ' Surges ',  ' Soars ', ' Spikes '];
const commodity_loser_cat1 = [' Falls ', ' Dips ', ' Drops ', ' Sinks '];
const commodity_loser_cat2 = [' Slumps ', ' Plunges ', ' Descends ', ' Tumbles '];

const currency_winner = [' Apperciates ']
const currency_loser = [' Depreciates ']

function getTitle (category, append, prepend, name, change, random) {
    if (random == true) {
        var title = append + name + getRandomItem(category) + 'by ' + prepend + change + '%';
    } else {
        var title = append + name + ' ' + prepend + change + '%';
    }    
    return title
}

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
        if (request_to_group_upper == 'CURRENCIES') {
            if(ordered_stuff[i].change > 0) {
                prepend = '+';
                if (append.length > 2) {
                    te_title += getTitle(currency_winner, append, prepend, ordered_stuff[i], false);
                }  else {
                    te_title += getTitle(currency_winner, append, prepend, ordered_stuff[i], true);
                }
            } else if (ordered_stuff[i].change < 0) {
                if (append.length > 2) {
                    te_title += getTitle(currency_loser, append, prepend, ordered_stuff[i], false);
                }  else {
                    te_title += getTitle(currency_loser, append, prepend, ordered_stuff[i], true);
                }
            }
        } else {
            if(ordered_stuff[i].change > 0){
                prepend = '+';
                if (ordered_stuff[i].change >= 0.5) {
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
                if (ordered_stuff[i].change <= 0.5) {
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
            } else {
                console.log('ordered_stuff[i].change neither + nor - over 0.1% ');
            }
        }
    }
    
    console.log(te_title)
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
    }
    return name
}

function insert_title_by_category(row_value, symbol, change) {
    append = ''
    prepend = ''
    const name = plain_english(symbol)
    if (change > 0) {
        prepend = '+'
        te_title = getTitle(currency_winner, append, prepend, name, change, true)
    } else {
        te_title = getTitle(currency_loser, append, prepend, name, change, true)
    }
    row_value += ' ' + te_title
    console.log(row_value)
    console.log(typeof(row_value))
}

function read_csv(file) {
    const fs = require('fs');
    const csv = require('csv-parser');

    fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
    // console.log(row);
    row_value = row['fx/commodity'];
    const columns = row_value.trim().split('\t');
    if (columns.length >= 3) {
        const symbol = columns[0];
        let change = columns[3];
        change = parseFloat(change.replace('%', ''));
        insert_title_by_category(row_value, symbol, change);
      }
   
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
}



let ordered_stuff

/* var request_to_group_upper = 'COMMODITIES'
te_title = 'Commodities Updates:'
ordered_stuff = [{"name":"France Electricity","change":0.1005,"abs_change":5.1005},{"name":"TTF Gas","change":5.01,"abs_change":5.01}] */

var request_to_group_upper = 'CURRENCIES'
// te_title = 'FX Updates:'
// ordered_stuff = [{"name":"Zimbabwean RTGS Dollar","change":+87.9511,"abs_change":87.9511},{"name":"USDAOA","change":+3.38,"abs_change":3.38}]

if (request_to_group_upper == 'CURRENCIES') {
    read_csv('test_currency.csv')
} else if (request_to_group_upper == 'COMMODITIES') {
    read_csv('test_commodity.csv')
}


