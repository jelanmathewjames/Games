const code = window.location.href.substring(window.location.href.lastIndexOf('/'))
const url = 'ws://'+window.location.host+'/newtictactoe'+code
const chatSocket = new WebSocket(url)


let icons = ["+","+","+","+","+","+","+","+","+"]
let count = 0
let move = null
let success = true

function changePosition(move,position){
    [icons[position],icons[move]] = [icons[move],icons[position]]
    document.getElementById("button"+move).innerHTML = "+"
    document.getElementById("button"+position).innerHTML = current_player
    success = true
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
                        changePosition(move,position)
                    }else if(move == 1 && (position == 0 || position == 2 || position == 4) ){
                        changePosition(move,position)
                    }else if(move ==2 && (position == 1 || position == 5 || position == 4) ){
                        changePosition(move,position)
                    }else if(move ==3 && (position == 4 || position == 0 || position == 6) ){
                        changePosition(move,position)
                    }else if(move ==4){
                        changePosition(move,position)
                    }else if(move ==5 && (position == 2 || position == 8 || position == 4)){
                        changePosition(move,position)
                    }else if(move ==6 && (position == 3 || position == 7 || position == 4) ){
                        changePosition(move,position)
                    }else if(move ==7 && (position == 6 || position == 8 || position == 4) ){
                        changePosition(move,position)
                    }else if(move ==8 && (position == 5 || position == 7 || position == 4) ){
                        changePosition(move,position)
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
        winningChanges()
    }else if(icons[3]==icons[4]&& icons[3]==icons[5] && icons[3]!='+'){
        winningChanges()
    }else if(icons[6]==icons[7] && icons[6]==icons[8] && icons[6]!='+'){
        winningChanges()
    }else if(icons[0]==icons[4] && icons[0]==icons[8] && icons[0]!='+'){
        winningChanges()
    }else if(icons[2]==icons[4] && icons[2]==icons[6] && icons[2]!='+'){
        winningChanges()
    }else if(icons[0]==icons[3] && icons[0]==icons[6] && icons[0]!='+'){
        winningChanges()
    }else if(icons[1]==icons[4] && icons[1]==icons[7] && icons[1]!='+'){
        winningChanges()
    }else if(icons[2]==icons[5] && icons[2]==icons[8] && icons[2]!='+'){
        winningChanges()
    }
}
function botMove(){
    pass
}
function buttonAction(button_num){
    playerMove(button_num)
    if(success){
        checkWinner()
        changePlayer()
    }
}