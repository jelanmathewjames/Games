let playmode
let player1 
let player2
let current_player = "x"
let icons = ["+","+","+","+","+","+","+","+","+"]
let count = 0
let move = null
let success = true

$('#create').click(()=>{
    
    $.ajax({
        url:'/newtictactoe/create',
        method:'GET',
        data:null,
        datatype:'json',
        success:(data)=>{
            webSocketConnect(data.code)
        }    
    })
    
    
})
$('#join').click(()=>{
    $.ajax({
        url:'/newtictactoe/join',
        method:'GET',
        data:{'room_id':$('#roomid').val()},
        datatype:'json',
        success:(data)=>{
            if(data.success=='true'){
                webSocketConnect(data.code)
            }else if(data.success == 'false'){
                alert("No room founded for this ID")
            }else if(data.success == 'full'){
                alert("Room is full")
            }
        }
    })
})

function webSocketConnect(code){
    let url = 'ws://'+window.location.host+'/newtictactoe/'+code
    const chatSocket = new WebSocket(url)
}
function playMode(mode){
    if(mode == '1v1'){
        document.getElementById("room").style.display = "flex"
        document.getElementById("mode").style.display = "none"
        playmode = mode
    }else if(mode == 'pc'){
        pass
    }
}

    

function changePlayer(){
    if(current_player == "x"){
        current_player = "o"
    }else if(current_player == "o"){
        current_player = "x"
    }
}
function changePosition(move,position){
    [icons[position],icons[move]] = [icons[move],icons[position]]
    document.getElementById("button"+move).innerHTML = "+"
    document.getElementById("button"+position).innerHTML = current_player
    success = true
}
function winningChanges(){
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