    let player1 
    let player2
    let current_player = "x"
    let icons = ["+","+","+","+","+","+","+","+","+"]
    let count = 0
    let move = null
    let success = true
    function enterName(n){
        if(n == 1){
            player1 = document.getElementById("player1name").value
            document.getElementById("player1").style.display = "none"
            document.getElementById("player2").style.display = "flex"
        }else if(n ==2){
            player2 = document.getElementById("player2name").value
            document.getElementById("player2").style.display = "none"
            document.getElementById("playboard").style.display = "block"
        }
    }
    function changePlayer(){
        if(current_player == "x"){
            current_player = "o"
        }else if(current_player == "o"){
            current_player = "x"
        }
    }
    function playerMove(position){
        if(count<6){
            if(icons[position] == "+"){
                icons[position] = current_player
                document.getElementById("button"+position).innerHTML = current_player
                count++
                success = true
            }else{
                alert("Wrong entry")
                success = false
            }
        }else{
                if(move == null){
                    if(icons[position] == current_player){
                        move = position
                    }else{
                        alert("Not your Icon")
                    }
                    success = false
                }else if(move != null){
                    if(icons[position] == "+"){
                        if(move == 0 &&  (position == 1 || position == 3 || position == 4)){

                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move == 1 && (position == 0 || position == 2 || position == 4) ){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move ==2 && (position == 1 || position == 5 || position == 4) ){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move ==3 && (position == 4 || position == 0 || position == 6) ){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move ==4){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move ==5 && (position == 2 || position == 8 || position == 4)){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move ==6 && (position == 3 || position == 7 || position == 4) ){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move ==7 && (position == 6 || position == 8 || position == 4) ){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else if(move ==8 && (position == 5 || position == 7 || position == 4) ){
                            [icons[position],icons[move]] = [icons[move],icons[position]]
                            document.getElementById("button"+move).innerHTML = "+"
                            document.getElementById("button"+position).innerHTML = current_player
                            success = true
                        }else{
                            alert("Cannot move to that Position")
                            success = false
                        }
                    }else{
                        alert("Already occupied")
                        success = false
                    }
                    move = null
                }
        }
        
    }
    function checkWinner(){
        if(icons[0]==icons[1] && icons[0]==icons[2] && icons[0]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }else if(icons[3]==icons[4]&& icons[3]==icons[5] && icons[3]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }else if(icons[6]==icons[7] && icons[6]==icons[8] && icons[6]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }else if(icons[0]==icons[4] && icons[0]==icons[8] && icons[0]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }else if(icons[2]==icons[4] && icons[2]==icons[6] && icons[2]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }else if(icons[0]==icons[3] && icons[0]==icons[6] && icons[0]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }else if(icons[1]==icons[4] && icons[1]==icons[7] && icons[1]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }else if(icons[2]==icons[5] && icons[2]==icons[8] && icons[2]!='+'){
            if(current_player == 'x'){
                document.getElementById("warning").innerHTML = player1+" winned The Game (refresh to play again)"
            }else{
                document.getElementById("warning").innerHTML = player2+" winned The Game (refresh to play again)"
            }
            setTimeout(()=>{document.getElementById("playboard").style.display = "none"},3000)
            current_player = "x"
            icons = ["+","+","+","+","+","+","+","+","+"]
            count = 0
        }
    }
    function buttonAction(button_num){
        playerMove(button_num)
        if(success){
            checkWinner()
            changePlayer()
        }
    }