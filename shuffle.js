

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


const commodity_winner_cat1 = [' Rises ', ' Increases ',  ' Incurs Gains ', ' Grows '];
const commodity_winner_cat2 = [' Rallies ', ' Surges ',  ' Soars ', ' Spikes '];
const commodity_loser_cat1 = [' Falls ', ' Dips ', ' Drops ', ' Sinks '];
const commodity_loser_cat2 = [' Slumps ', ' Plunges ', ' Descends ', ' Tumbles '];

const currency_winner = [' apperciates ']
const currency_loser = [' depreciates ']

function getTitle (category, append, prepend, index_val, random) {
    if (random == true) {
        var title = append + index_val.name + getRandomItem(category) + 'by ' + prepend + index_val.change + '%';
    } else {
        var title = append + index_val.name + ' ' + prepend + index_val.change + '%';
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


function read_csv() {
    const fs = require('fs');
    const csv = require('csv-parser');
    const arrayOfObjects = [];

    fs.createReadStream('test_currency.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row);
    row_value = row['fx'];
    const columns = row_value.trim().split('\t');
    if (columns.length >= 3) {
        const name = columns[0];
        let change = columns[3];
        change = parseFloat(change.replace('%', ''));
        console.log(typeof(change))
        const obj = {
            "name": name,
            "change": change
        }
        arrayOfObjects.push(obj);
      }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(arrayOfObjects);
    console.log(arrayOfObjects.length)
    handleTopGainNLoss(arrayOfObjects);
  });
}



let ordered_stuff

/* var request_to_group_upper = 'COMMODITIES'
te_title = 'Commodities Updates:'
ordered_stuff = [{"name":"France Electricity","change":0.1005,"abs_change":5.1005},{"name":"TTF Gas","change":5.01,"abs_change":5.01}] */

var request_to_group_upper = 'CURRENCIES'
te_title = 'FX Updates:'
// ordered_stuff = [{"name":"Zimbabwean RTGS Dollar","change":+87.9511,"abs_change":87.9511},{"name":"USDAOA","change":+3.38,"abs_change":3.38}]

read_csv()

