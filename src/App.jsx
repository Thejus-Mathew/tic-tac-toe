import './App.css'
import image from '../public/image.png'
import x1 from '../public/x1.png'
import x2 from '../public/x2.png'
import x3 from '../public/x3.png'
import o1 from '../public/o1.png'
import o2 from '../public/o2.png'
import o3 from '../public/o3.png'
import { useState } from 'react'
import { useEffect } from 'react'
import line from '../public/line.png'

function App() {
  const[x,setX]=useState([x1,x2,x3])
  const[o,setO]=useState([o1,o2,o3])
  const[end,setEnd]=useState(false)
  const[users,setUsers]= useState(1)
  const[userStarted,setUserStarted] = useState(true)
  


  const[cells,setCells]=useState(()=>{
    let dummyCells = []
    for(let i=0;i<9;i++){
      dummyCells.push({cell:i,input:false,value:0})
      if(0<=i && i<3){
        dummyCells[i].col=1
      }
      else if(0<=3 && i<6){
        dummyCells[i].col=2
      }
      else{
        dummyCells[i].col=3
      }
      if(i==0 || i==3 || i==6){
        dummyCells[i].row=1
      }
      else if(i==1 || i==4 || i==7){
        dummyCells[i].row=2
      }
      else{
        dummyCells[i].row=3
      }
      if(i==0 || i==8){
        dummyCells[i].dia1=true
        dummyCells[i].dia2=false
      }
      else if(i==2 || i==6){
        dummyCells[i].dia1=false
        dummyCells[i].dia2=true
      }
      else{
        dummyCells[i].dia1=false
        dummyCells[i].dia2=false
      }
      if(i==4){
        dummyCells[i].dia1=true
        dummyCells[i].dia2=true
      }
    }
    return dummyCells
  })






  const change = (key) =>{
    
    let dummyCells = cells
    dummyCells = dummyCells.map(item=>
      item.cell==key?
      dummyCells.map(item=>item.value).reduce((a,b)=>a+b,0)==0?
      {...item,value:1,input:true}
      :{...item,value:-1,input:true}
      :item
    )
    setCells(dummyCells)


    if(check(dummyCells).user==0){
      users==1? auto(dummyCells):null
    }
    }







  useEffect(()=>{
    let num = check(cells)
    console.log(num);
    setLineNum(num.cross)
  },[cells])







  const check = (dummy) =>{
    for(let i =1;i<4;i++){
      let sum=dummy.filter(item=>item.col==i).map(item=>item.value).reduce((a,b)=>a+b,0)
      if(sum==3){
        setEnd(true)
        return {user:1,cross:i-1}
      }else if(sum==-3){
        setEnd(true)
        return {user:2,cross:i-1}
      }
    }
    for(let i =1;i<4;i++){
      let sum=dummy.filter(item=>item.row==i).map(item=>item.value).reduce((a,b)=>a+b,0)
      if(sum==3){
        setEnd(true)
        return {user:1,cross:i+2}
      }else if(sum==-3){
        setEnd(true)
        return {user:2,cross:i+2}
      }
    }
    let sum1 = dummy.filter(item=>item.dia1==true).map(item=>item.value).reduce((a,b)=>a+b,0)
    let sum2 = dummy.filter(item=>item.dia2==true).map(item=>item.value).reduce((a,b)=>a+b,0)
    if((sum1==3)||(sum2==3)){
      setEnd(true)
      if(sum2==3){
        return {user:1,cross:7}
      }
      return {user:1,cross:6}
    }
    else if((sum1==-3)||(sum2==-3)){
      setEnd(true)
      if(sum2==-3){
        return {user:1,cross:7}
      }
      return {user:2,cross:6}
    }
    return dummy.filter(item=>!item.input).length==0?{user:3,cross:8}:{user:0,cross:8}
  }










  const check2=(dummy,n)=>{
    for(let i =1;i<4;i++){
      let sum=dummy.filter(item=>item.col==i).map(item=>item.value).reduce((a,b)=>a+b,0)
      if(sum==n){
        if(dummy.filter(item=>item.col==i).find(item=>!item.input)){
          return dummy.filter(item=>item.col==i).find(item=>!item.input)
        }
      }
    }
    for(let i =1;i<4;i++){
      let sum=dummy.filter(item=>item.row==i).map(item=>item.value).reduce((a,b)=>a+b,0)
      if(sum==n){
        if(dummy.filter(item=>item.row==i).find(item=>!item.input)){
          return dummy.filter(item=>item.row==i).find(item=>!item.input)
        }
      }
    }
    let sum3 = dummy.filter(item=>item.dia1==true).map(item=>item.value).reduce((a,b)=>a+b,0)
    let sum2 = dummy.filter(item=>item.dia2==true).map(item=>item.value).reduce((a,b)=>a+b,0)

    if(sum2==n){
      if(dummy.filter(item=>item.dia2==true).find(item=>!item.input)){
        return dummy.filter(item=>item.dia2==true).find(item=>!item.input)
      }
    }
    else if(sum3==n){
      if(dummy.filter(item=>item.dia1==true).find(item=>!item.input)){
        return dummy.filter(item=>item.dia1==true).find(item=>!item.input)
      }
    }
    return
  }




  const auto = (dummyCells)=> {
    let num
    if (userStarted) {
      num = -2
    }else{
      num = 2
    }
    if(check2(dummyCells,num)){
      let key2 = check2(dummyCells,num).cell
      dummyCells = dummyCells.map(item=>
        item.cell==key2?
        dummyCells.map(item=>item.value).reduce((a,b)=>a+b,0)==0?
        {...item,value:1,input:true}
        :{...item,value:-1,input:true}
        :item
      )
    }
    else if(check2(dummyCells,-num)){
      let key2 = check2(dummyCells,-num).cell
      dummyCells = dummyCells.map(item=>
        item.cell==key2?
        dummyCells.map(item=>item.value).reduce((a,b)=>a+b,0)==0?
        {...item,value:1,input:true}
        :{...item,value:-1,input:true}
        :item
      )
    }else{
      let random = dummyCells.filter(item=>!item.input)
      let n = Math.floor(Math.random()*random.length)
      let key2 = random[n].cell
      if(!dummyCells[4].input){
        key2 = 4
      }
      
      dummyCells = dummyCells.map(item=>
        item.cell==key2?
        dummyCells.map(item=>item.value).reduce((a,b)=>a+b,0)==0?
        {...item,value:1,input:true}
        :{...item,value:-1,input:true}
        :item
      )
    }
    setCells(dummyCells)
  }



  const restart = ()=>{
    let dummyCells = []
      for(let i=0;i<9;i++){
        dummyCells.push({cell:i,input:false,value:0})
        if(0<=i && i<3){
          dummyCells[i].col=1
        }
        else if(0<=3 && i<6){
          dummyCells[i].col=2
        }
        else{
          dummyCells[i].col=3
        }
        if(i==0 || i==3 || i==6){
          dummyCells[i].row=1
        }
        else if(i==1 || i==4 || i==7){
          dummyCells[i].row=2
        }
        else{
          dummyCells[i].row=3
        }
        if(i==0 || i==8){
          dummyCells[i].dia1=true
          dummyCells[i].dia2=false
        }
        else if(i==2 || i==6){
          dummyCells[i].dia1=false
          dummyCells[i].dia2=true
        }
        else{
          dummyCells[i].dia1=false
          dummyCells[i].dia2=false
        }
        if(i==4){
          dummyCells[i].dia1=true
          dummyCells[i].dia2=true
        }
      }



    if(users==1){
      let start = Math.floor(Math.random()*2)
      if (start == 1){
        setUserStarted(false)
        let random = dummyCells.filter(item=>!item.input)
        let n = Math.floor(Math.random()*random.length)
        let key2 = random[n].cell
        if(!dummyCells[4].input){
          key2 = 4
        }
        dummyCells = dummyCells.map(item=>
          item.cell==key2?
          dummyCells.map(item=>item.value).reduce((a,b)=>a+b,0)==0?
          {...item,value:1,input:true}
          :{...item,value:-1,input:true}
          :item
        )
      }
    }
    setCells(dummyCells)
  }


  const [lines,setLines]=useState([
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"-32%"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"-5%"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"22.5%"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"0px",left:"-28%",transform: "rotate(90deg)"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"0px",left:"-4%",transform: "rotate(95deg)"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"0px",left:"23%",transform: "rotate(95deg)"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"0px",transform: "rotate(48deg)"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <div className="image position-absolute" style={{width:"100%",height:"100%",top:"-5%",left:"-4%",transform: "rotate(-45deg)"}}>
          <img src={line} width={"100%"} alt="" />
        </div>,
        <></>
  ])
  const [lineNum,setLineNum]=useState(8)


  useEffect(()=>{
    restart()
  },[])

  return (
    <div className='main d-flex justify-content-center align-items-center'>
      <button onClick={restart}>restart</button>
      <div className="div shadow-lg rounded position-relative">
        {
          lines[lineNum]
        }
        <img src={image} style={{filter:"invert(1)"}} className='position-absolute' width={"100%"} height={"100%"} alt="" />
        <div className="rows1 rows">
          <div className="cell cell1">
            <button disabled={cells[0].input || end} onClick={()=>change(0)}>
              {
                cells[0]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[0]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
          <div className="cell cell2">
            <button disabled={cells[1].input || end} onClick={()=>change(1)}>
              {
                cells[1]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[1]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
          <div className="cell cell3">
            <button disabled={cells[2].input || end} onClick={()=>change(2)}>
              {
                cells[2]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[2]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button >
          </div>
        </div>
        <div className="rows2 rows">
          <div className="cell cell4">
            <button disabled={cells[3].input || end} onClick={()=>change(3)}>
             {
                cells[3]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[3]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
          <div className="cell cell5">
            <button disabled={cells[4].input || end} onClick={()=>change(4)}>
              {
                cells[4]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[4]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
          <div className="cell cell6">
            <button disabled={cells[5].input || end} onClick={()=>change(5)}>
              {
                cells[5]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[5]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
        </div>
        <div className="rows3 rows">
          <div className="cell cell7">
            <button disabled={cells[6].input || end} onClick={()=>change(6)}>
            {
                cells[6]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[6]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
          <div className="cell cell8">
            <button disabled={cells[7].input || end} onClick={()=>change(7)}>
            {
                cells[7]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[7]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
          <div className="cell cell9">
            <button disabled={cells[8].input || end} onClick={()=>change(8)}>
            {
                cells[8]?.value==1
                ?<><img src={x[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :cells[8]?.value==-1
                ?<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} alt="" /></>
                :<><img src={o[Math.floor(Math.random()*3)]} width={"100%"} height={"100%"} style={{opacity:0}} alt="" /></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
