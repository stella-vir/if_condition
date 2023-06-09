
let ordered_stuff

/* var request_to_group_upper = 'COMMODITIES'
te_title = 'Commodities Updates:'
ordered_stuff = [{"name":"France Electricity","change":0.1005,"abs_change":5.1005},{"name":"TTF Gas","change":5.01,"abs_change":5.01}] */

var request_to_group_upper = 'CURRENCIES'
te_title = 'FX Updates:'
ordered_stuff = [{"name":"Zimbabwean RTGS Dollar","change":+87.9511,"abs_change":87.9511},{"name":"USDAOA","change":+3.38,"abs_change":3.38}]



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

function getTitle (category, prepend, random) {
    if (random == true) {
        var title = append + ordered_stuff[i].name + getRandomItem(category) + 'by ' +prepend+ordered_stuff[i].change.toFixed(2)+'%';
    } else {
        var title = append + ordered_stuff[i].name + ' ' +prepend+ordered_stuff[i].change.toFixed(2)+'%';
    }    
    return title
}


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
                te_title += getTitle(currency_winner, prepend, false);
            }  else {
                te_title += getTitle(currency_winner, prepend, true);
            }
        } else if (ordered_stuff[i].change < 0) {
            if (append.length > 2) {
                te_title += getTitle(currency_loser, prepend, false);
            }  else {
                te_title += getTitle(currency_loser, prepend, true);
            }
        }
    } else {
        if(ordered_stuff[i].change > 0){
            prepend = '+';
            if (ordered_stuff[i].change >= 0.5) {
                if (append.length > 2) {
                    te_title += getTitle(commodity_winner_cat2, prepend, false);
                } else {
                    te_title += getTitle(commodity_winner_cat2, prepend, true);
                }
            } else {
                if (append.length > 2) {
                    te_title += getTitle(commodity_winner_cat1, prepend, false);
                }  else {
                    te_title += getTitle(commodity_winner_cat1, prepend, true);
                }        
            }
        } else if(ordered_stuff[i].change < 0){
            if (ordered_stuff[i].change <= 0.5) {
                if (append.length > 2) {
                    te_title += getTitle(commodity_loser_cat2, prepend, false);
                 } else {
                    te_title += getTitle(commodity_loser_cat2, prepend, true);
                }
            } else {
                if (append.length > 2) {
                    te_title += getTitle(commodity_loser_cat1, prepend, false);
                }  else {
                    te_title += getTitle(commodity_loser_cat1, prepend, true);
                }        
            }
        } else {
            console.log('ordered_stuff[i].change neither + nor - over 0.1% ');
        }
    }
}

console.log(te_title)



