$('#contact').popover({ html:true }).click(function () {
    setTimeout(function () {
        $('#contact').popover('hide');
    }, 5000);
});


var a = ('con'+'ta'+'ct@'+'st'+'ell'+'ardi'+'ce.c'+'om');

$("#contact").attr('data-content', '<b>Email: <a href="mailto:' + a + '">' + a + '</a></b>') ;


updateGame(savedGame);
game_options();
getbalance();

function updateGame(lessthan){

	if(lessthan < 1){
		lessthan = 1;
	} else if(lessthan > 64000){
		lessthan = 64000;
	}

	var game = gameDetails(lessthan);
    $('#lessthan').val(game.lessthan);
    $('#multiplier').val(game.multiplier);
    $('#odds').val(game.odds);
    $('#maxbet').val(game.maximum);
}


function gameDetails(lessthan) {
    var multi   = sigDigits(65536 / lessthan * .99, 5);
    var maximum = maxbet(lessthan, multi, maxwin);

    var game = {
    	lessthan: lessthan,
    	multiplier: multi,
    	odds: (lessthan / 65536 * 100).toPrecision(3),
    	maximum: formatNUM(maximum)
    };
    return game;
}

function maxbet(lessthan, multi, maxwin) {
    var res;
    res = maxwin / multi;
    return Math.round(sigDigits(res, 2));
}

function sigDigits(n, sig) {
    var mult;
    mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.floor(n * mult) / mult;
}

function formatNUM(n) {
    var dotPos, i, len, num, _i;
    num = (n / 1e8).toFixed(7);
    if (dotPos = num.indexOf(".")) {
        len = num.length - 1;
        for (i = _i = len; len <= 0 ? _i <= 0 : _i >= 0; i = len <= 0 ? ++_i : --_i) {
            if (num[i] !== "0") {
                if (i - dotPos <= 2) {
                    return num.substr(0, 3 + dotPos)
                } else {
                    return num.substr(0, i + 1);
                }
            }
        }
    } else {
        return num;
    }
}

function game_options(){
	var games = [60000, 55000, 32768, 16384, 7000, 2400, 1000, 1];
	var list  = '';
	games.forEach(function (item){
		var game  = gameDetails(item);
		list += '<li><a href="javascript:void(0)" onclick="updateGame('+item+')">&lt; '+item+' &nbsp;&nbsp;&nbsp;';
		if(item < 10000){
			list += '&nbsp;&nbsp;';
		}
		list += game['odds']+'% &nbsp;&nbsp;&nbsp; '+game['multiplier']+'x</a></li>';
	});

    $('#games').html(list);
}

function getbalance(){
	$.post("/api/getbalance", {user: userId, password: userPass}, function(data){
		if(data.result == 1){
		    $('#balance').html(data.balance);
		    $('#bets').html(data.bets);
		    $('#win').html(data.wins);
		    $('#lose').html(Math.round(data.bets - data.wins));
		    $('#wagered').html(data.wagered);
		    if(data.profit >= 0){
		    	$('#profit').html('<b class="text-success">'+data.profit+'</b>');
		    } else {
		    	$('#profit').html('<b class="text-danger">'+data.profit+'</b>');
		    }
		} else{
		    $('#balance').html('0.0000000');
		}
	});	
}

function bet(){
	var lessthan = $('#lessthan').val();
	var amount = $('#amount').val();
	$.post("/api/bet", {user: userId, password: userPass, lessthan: lessthan, amount: amount}, function(data){

		if(data.result == 1){
			if($("#nobets").length){
				$("#history").html("");
			}	

			if(data.profit_bet > 0){ var result = '<b class="text-success">+'+data.profit_bet+'</b>'; var lucky = '<b class="text-success">'+data.lucky+'</b>'; } else { var result =  '<b class="text-danger">'+data.profit_bet+'</b>';  var lucky =  '<b class="text-danger">'+data.lucky+'</b>';}
			$('<tr id="bet-'+data.id+'"><td><a href="/bet/'+data.id+'"><samp>'+data.id+'</samp></a></td><td><b>'+data.date+'</b></td><td>'+lucky+'</td><td><b>&lt; '+data.lessthan+'</b></td><td><b>'+data.amount+'</b></td><td><b>'+data.multiplier+'</b></td><td>'+result+'</td></tr>').hide().prependTo('#history').fadeIn("slow");		
			if($('#history tr').length >= 10){
				$("table tr:last").remove();		
			}

		    $('#balance').html(data.balance);
		    $('#bets').html(data.bets);
		    $('#win').html(data.wins);
		    $('#lose').html(Math.round(data.bets - data.wins));
		    $('#wagered').html(data.wagered);
		    if(data.profit >= 0){
		    	$('#profit').html('<b class="text-success">'+data.profit+'</b>');
		    } else {
		    	$('#profit').html('<b class="text-danger">'+data.profit+'</b>');
		    }
		} else {
	  		$('#app-growl').append('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">X</span></button><p>'+data.error+'</p></div>').delay(5000).fadeOut('slow');	
		}

	});	
}

function half_bet(){
	if($('#amount').val() < 0.00001){
		$('#amount').val('0.00001000');
	} else {
		var dubled = $('#amount').val()/2;
		$('#amount').val(dubled.toFixed(7));
	}
}

function double_bet(){
	if($('#amount').val() < 0.00001){
		$('#amount').val('0.00001000');
	} else {
		var dubled = $('#amount').val()*2;
		$('#amount').val(dubled.toFixed(7));
	}
}

function max(){
	getbalance();
	var game  = gameDetails($('#lessthan').val());
	var balance = $('#balance').html()*1;
	if(balance > game.maximum){
		var max = game.maximum*1;
		$('#amount').val(max.toFixed(7));
	} else {
		$('#amount').val(balance.toFixed(7));
	}
}

function min(){
	$('#amount').val('0.0000100');
}

function stats(){
	$.get("/api/stats", function(res){
		res.lastBets.reverse().forEach(function (data){
			if($('#bet-'+data.bet_id).length == 0){
				var game = gameDetails(data.lessthan);
				if(data.profit > 0){ var result = '<b class="text-success">+'+data.profit+'</b>'; var lucky = '<b class="text-success">'+data.lucky+'</b>'; } else { var result =  '<b class="text-danger">'+data.profit+'</b>';  var lucky =  '<b class="text-danger">'+data.lucky+'</b>';}
				$('<tr id="bet-'+data.bet_id+'"><td><a href="/bet/'+data.bet_id+'"><samp>'+data.bet_id+'</samp></a></td><td><a href="/user/'+data.user_id+'"><samp>'+data.user_id+'</samp></a></td><td><b>'+data.stamp+'</b></td><td>'+lucky+'</td><td><b>&lt; '+data.lessthan+'</b></td><td><b>'+data.amount+'</b></td><td><b>'+game.multiplier+'</b></td><td>'+result+'</td></tr>').hide().prependTo('#history').fadeIn("slow");		
				if($('#history tr').length >= 15){
					$("table tr:last").remove();		
				}
			}
		});
    $('#site_bets').html(res.bets);
    $('#site_wagered').html(res.wagered);
    $('#site_profit').html(res.profit);
	});

}

function sync_transactions(){
	$.post("/api/transactions", {user: userId, password: userPass}, function(txs){

	var server = new StellarSdk.Server('https://horizon.stellar.org');
	window.setInterval(function(){
		server.transactions().forAccount(depositAddress).order('desc').limit(200).call().then(function (transactions){

			transactions.records.forEach(function (tx){
				var found = $.inArray(tx.id, txs.records) > -1;
				if(!found && tx.memo == userId){
					$.post("/api/deposit", {user: userId, password: userPass, tx: tx.id}, function(data){
						if(data.result == 1){
							window.location.reload();
						}
					});	
				}
			});

	  	}).catch(function (err) {
	    	console.error(err);
	  	})
	}, 5000); 

	});	
}

function withdraw(){
	var balance = $('#balance').html();

	
	if(!StellarSdk.Keypair.isValidPublicKey($('#address').val())){
	  	$('#app-growl').append('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">X</span></button><p>Invalid withdrawal address</p></div>').delay(5000).fadeOut('slow');	
	}

	if($('#amount').val() > balance){
	  	$('#app-growl').append('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">X</span></button><p>Insuficient funds</p></div>').delay(5000).fadeOut('slow');	
	}

	if($('#amount').val() < 0.00001){
	  	$('#app-growl').append('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">X</span></button><p>Minimum withdrawal is 0.00001 XLM</p></div>').delay(5000).fadeOut('slow');	
	}


	if($('#amount').val() > 0.00001 && $('#amount').val() <= balance && StellarSdk.Keypair.isValidPublicKey($('#address').val())){
		$('#wbtn').html('<img src="/assets/img/loading.gif" height="19">');
		$.post("/api/withdraw", {user: userId, password: userPass, address: $('#address').val(), amount: $('#amount').val()}, function(data){
			if(data.result == 1){
				window.location.reload();
			} else {
	  			$('#app-growl').append('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">X</span></button><p>'+data.error+'</p></div>').delay(5000).fadeOut('slow');	
			}
		});	

	}
}






function format_bet_id(value, row, index) {
	return '<a href="/bet/'+value+'"><samp>'+value+'</samp></a>';
}

function format_bold(value, row, index) {
	return '<b>'+value+'</b>';
}

function format_lessthan(value, row, index) {
	return '<b>&lt; '+value+'</b>';
}

function format_lucky(value, row, index) {
	if(row.win == 1){
		return '<b class="text-success">'+value+'</b>';
	} else {
		return '<b class="text-danger">'+value+'</b>';
	}
}

function format_profit(value, row, index) {
	if(row.win == 1){
		return '<b class="text-success">+'+value+'</b>';
	} else {
		return '<b class="text-danger">'+value+'</b>';
	}
}

