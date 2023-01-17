const url = 'ws://'+window.location.host+'/newtictactoe/'+$('#room_id').text()+'/'+$('#name').text()
const chatSocket = new WebSocket(url)
var player = ''
var opponent = ''
chatSocket.onopen = (e)=>{
    chatSocket.send(
        JSON.stringify({
            type : "reload"
        })
    )
}
chatSocket.onmessage = (e)=>{
    console.log("hello")
    const data = JSON.parse(e.data)
    if(data.type == 'select_side'){
        console.log("side")
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
        }
    }
}

$("#btnx").click(()=>{
    chatSocket.send(
        JSON.stringify({
            command: "select_side",
            info: 'x'
        })
    )
    document.getElementById('btnx').className = "btn btn-success"
})
$("#btny").click(()=>{
    document.getElementById('btny').className = "btn btn-success"
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