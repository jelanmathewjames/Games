const url = 'ws://'+window.location.host+'/newtictactoe/'+$('#room_id').text()+'/'+$('#name').text()
const chatSocket = new WebSocket(url)
let player = ''
let opponent = ''
let player_side = ''
let count = 0
let icons = ["+","+","+","+","+","+","+","+","+"]
chatSocket.onopen = (e)=>{
    chatSocket.send(
        JSON.stringify({
            type : "reload"
        })
    )
}
function buttonAction(button_num){
    if (count < 6){
        if(icons[button_num] == '+'){
            chatSocket.send(
                JSON.stringify({
                    type : 'movement',
                    button : button_num,
                    your_side : player_side
                })
            )
        }else if(icons[button_num] == player_side){
            alert("you cannot select icon that already selected")
        }else{
            alert("opponent already selected the icon")
        }
    }
}
function reset_game(){
    document.getElementById('btn'+player_side).className = "btn btn-danger"
    opponent = ''
    player_side = ''
    chatSocket.send(
        JSON.stringify({
            type : 'reset_game'
        })
    )
}
chatSocket.onmessage = (e)=>{
    const data = JSON.parse(e.data)
    if(data.type == 'movement'){
        if(data.turn == 'your'){
            document.getElementById('button'+data.button).className = "btn btn-success"
        }else if(data.turn == 'opponent'){
            document.getElementById('button'+data.button).className = "btn btn-danger"   
        }
        document.getElementById('button'+data.button).innerHTML = data.player_side
        icons[data.button] = data.player_side
        count++
    }else if(data.type == 'not_your_turn'){
        alert("Not your turn")
    }else if(data.type == 'reload_after_game_on'){
        if(player == data.name){
            console.log(data.name)
        }else{
            alert("You have winned the game due to the reload of opponent")
            reset_game()
        }
    }
    else if(data.type == 'select_side'){
        let side = data.message
        if(player_side == ''){
            if(data.message == 'X'){
                player_side = side = 'O'
            }else{
                player_side = side = 'X'
            }
            alert(player+" selected "+side+" side")
        }
        document.getElementById('btn'+side).className = "btn btn-success"
    }else if(data.type == 'reload'){
        if(player == ''){
            player = data.name
            chatSocket.send(
                JSON.stringify({
                    type : "opponent"
                })
            )
        }
    }else if(data.type == 'opponent'){
        if(player == data.name){
            console.log("checked")
        }else if(opponent == ''){
            opponent = data.name
            $('#opponent').text(opponent)
            chatSocket.send(
                JSON.stringify({
                    type : "opponent"
                })
            )
        }else if(opponent == data.name){
            chatSocket.send(
                JSON.stringify({
                    type : "reload_opponent",
                })
            )
        }
    }else if(data.type == 'reload_opponent'){
        if(opponent == ''){
            opponent = data.name
            $('#opponent').text(opponent)
        }
    }
}

$("#btnX").click(()=>{
    if(opponent == ''){
        alert("wait for opponent to join")
    }else{
        if(player_side == ''){
            player_side = 'X'
            chatSocket.send(
                JSON.stringify({
                    type: "select_side",
                    message: 'X'
                })
            )
        }else{
            alert("player side already decided")
        }
    }
})
$("#btnO").click(()=>{
    if(opponent == ''){
        alert("wait for opponent to join")
    }else{
        if(player_side == ''){
            player_side = 'O'
            chatSocket.send(
                JSON.stringify({
                    type: "select_side",
                    message: 'O'
                })
            )
        }else{
            alert("player side already decided")
        }
    }
    
})
/*let icons = ["+","+","+","+","+","+","+","+","+"]
let count = 0
let move = null
let success = true

chatSocket.onmessage = (e)=>{
    const data = JSON.parse(e.data)
    const command = data.command
    if(command == 'playermove'){
        if(command.success == 'true')
            changePosition(move,position)
    }
        
}
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

function buttonAction(button_num){
    playerMove(button_num)
    if(success){
        checkWinner()
        changePlayer()
    }
}*/