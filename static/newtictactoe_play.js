const url = 'ws://'+window.location.host+'/newtictactoe/'+$('#room_id').text()+'/'+$('#name').text()
const chatSocket = new WebSocket(url)
let player = ''
let opponent = ''
let player_side = ''
let count = 0
let move = null 
let icons = ["+","+","+","+","+","+","+","+","+"]
chatSocket.onopen = (e)=>{
    chatSocket.send(
        JSON.stringify({
            type : "reload"
        })
    )
}
function checkWinner(){
    let is_winned = false
    if(icons[0]==icons[1] && icons[0]==icons[2] && icons[0]!='+'){
        is_winned = true
    }else if(icons[3]==icons[4]&& icons[3]==icons[5] && icons[3]!='+'){
        is_winned = true
    }else if(icons[6]==icons[7] && icons[6]==icons[8] && icons[6]!='+'){
        is_winned = true
    }else if(icons[0]==icons[4] && icons[0]==icons[8] && icons[0]!='+'){
        is_winned = true
    }else if(icons[2]==icons[4] && icons[2]==icons[6] && icons[2]!='+'){
        is_winned = true
    }else if(icons[0]==icons[3] && icons[0]==icons[6] && icons[0]!='+'){
        is_winned = true
    }else if(icons[1]==icons[4] && icons[1]==icons[7] && icons[1]!='+'){
        is_winned = true
    }else if(icons[2]==icons[5] && icons[2]==icons[8] && icons[2]!='+'){
        is_winned = true
    }return is_winned
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
            $('#alert').text("you cannot select icon that already selected")
        }else{
            $('#alert').text("opponent already selected the icon")
        }
    }else{
        if(move == null){
            chatSocket.send(
                JSON.stringify({
                    type : 'check_turn',
                    button : button_num,
                })
            )
        }else{
            if(icons[button_num]== '+'){
                let success = false
                if(move == 0 &&  (button_num == 1 || button_num == 3 || button_num == 4)){
                    success = true
                }else if(move == 1 && (button_num == 0 || button_num == 2 || button_num == 4) ){
                    success = true
                }else if(move ==2 && (button_num == 1 || button_num == 5 || button_num == 4) ){
                    success = true
                }else if(move ==3 && (button_num == 4 || button_num == 0 || button_num == 6) ){
                    success = true
                }else if(move ==4){
                    success = true
                }else if(move ==5 && (button_num == 2 || button_num == 8 || button_num == 4)){
                    success = true
                }else if(move ==6 && (button_num == 3 || button_num == 7 || button_num == 4) ){
                    success = true
                }else if(move ==7 && (button_num == 6 || button_num == 8 || button_num == 4) ){
                    success = true
                }else if(move ==8 && (button_num == 5 || button_num == 7 || button_num == 4) ){
                    success = true
                }else{
                    $('#alert').text("Cannot move to that Position")
                }
                if(success){
                    chatSocket.send(JSON.stringify({
                        type: 'movement_after_setting',
                        move_icon: move,
                        position_icon: button_num,
                        button:player_side
                    }))
                }
            }else{
                $('#alert').text("position already occupied. select the position to move")
                move = null
            }
        }
    }
}
function reset_game(){
    document.getElementById('btn'+player_side).className = "btn btn-danger"
    opponent = ''
    player_side = ''
    icons = ["+","+","+","+","+","+","+","+","+"]
    let n = 0 
    setTimeout(()=>{
        while(n<=8){
            document.getElementById('button'+n).className = "btn btn-dark"
            document.getElementById('button'+n).innerHTML = '+'
            n++
        }window.location.reload()
    },5000)
    
}
function winnerChanges(){
    chatSocket.send(
        JSON.stringify({
            type:'winner_declaration'
        })
    )
}
chatSocket.onmessage = (e)=>{
    const data = JSON.parse(e.data)
    icons[data.position_icon] = icons[data.move_icon]
    icons[data.move_icon] = '+'
    if(data.type == 'winner_declaration'){
        $('#alert').text(data.name+" winned the game")
        reset_game()
    }else if(data.type == 'movement_after_setting'){
        let is_winned = false
        if(data.turn == 'your'){
            document.getElementById('button'+data.position_icon).className = "btn btn-success"
            is_winned = checkWinner()
        }else if(data.turn == 'opponent'){
            document.getElementById('button'+data.position_icon).className ="btn btn-danger"
        }
        move = null
        document.getElementById('button'+data.move_icon).className = "btn btn-dark"
        document.getElementById('button'+data.position_icon).innerHTML = data.button
        document.getElementById('button'+data.move_icon).innerHTML = '+'
        if(is_winned){
            winnerChanges()
        }
        
    }
    else if(data.type == 'check_turn'){
        if(data.is_your_turn){
            if(icons[data.button] == player_side){
                move = data.button
                $('#alert').text("Decide where to move")
            }else{
                $('#alert').text("Not your icon")
            }
        }else{
            $('#alert').text("Not your turn")
        }
    }else if(data.type == 'movement'){
        let is_winned = false
        icons[data.button] = data.player_side
        if(data.turn == 'your'){
            is_winned = checkWinner()
            document.getElementById('button'+data.button).className = "btn btn-success"
        }else if(data.turn == 'opponent'){
            document.getElementById('button'+data.button).className = "btn btn-danger"   
        }
        document.getElementById('button'+data.button).innerHTML = data.player_side
        count++
        if(is_winned){
            winnerChanges()
        }else{
            count >= 6?$('#alert').text("You have fixed your icons. Move it"):console.log("not fixed")
        }
    }else if(data.type == 'not_your_turn'){
        $('#alert').text("Not your turn")
    }else if(data.type == 'reload_before_game_on'){
        if(player != data.name){
            $('#alert').text("Opponent disconnected reloaded the game")
            opponent = ''
            $('#opponent').text(opponent)
        }
    }else if(data.type == 'reload_after_game_on'){
        if(player != data.name){
            $('#alert').text("You have winned the game opponent disconnected or reloaded the game")
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
            $('#alert').text(player+" selected "+side+" side")
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
        $('alert').text("wait for opponent to join")
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
            $('#alert').text("player side already decided")
        }
    }
})
$("#btnO").click(()=>{
    if(opponent == ''){
        $('#alert').text("wait for opponent to join")
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
            $('#alert').text("player side already decided")
        }
    }
    
})