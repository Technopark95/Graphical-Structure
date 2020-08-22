

var r = 0;

function height(N)  
{  
    if (N == "null") return 0;  

    
    return  parseInt( $(`#${N}height`).text(),10);  
}  
  





 function rightRotate(y)  
{  
   let unbalparent = parent[y];

  
    let x =  tree[`${y}treeleft`] /*  y->left;   */
    let T2 = tree[`${x}treeright`]  /* x->right;  */
  
  

     del(`#${y}treeleft` , `#${x}treetop`);
    mySVG.redrawLines();
    // Perform rotation  
    treefy(x+"treeright" , y)   /* x->right = y;  */ 
   
   if (T2 != "null"){ 
       treefy(y+"treeleft" , T2)
       del(`#${x}treeright` , `#${T2}treetop`);
    mySVG.redrawLines();


}
   /* y->left = T2;  */
   else tree[y+"treeleft" ] = T2
  
    
  
    // Update heights  
   // Log(`left height = ${height(tree[`${y}treeleft`])}   right height = ${height(tree[`${y}treeright`])}`)
   
   let yh = Math.max( height(tree[`${y}treeleft`]) ,  height(tree[`${y}treeright`])) + 1;  
    $(`#${y}height`).text(yh)


    //Log(`left height = ${height(tree[`${x}treeleft`])}   right height = ${height(tree[`${y}treeright`])}`)
    let xh = Math.max(height(tree[`${x}treeleft`]),  height(tree[`${x}treeright`])) + 1;
    
    $(`#${x}height`).text(xh)

    r = x;


    if ( parseInt( $(`#${unbalparent}treeval`).text() ,10)   <  parseInt($(`#${x}treeval`).text(),10) )  {
      treefy(unbalparent+"treeright" , x)
      del(`#${unbalparent}treeright` , `#${y}treetop`);
      mySVG.redrawLines();
      }
  
      else {
  
        treefy(unbalparent+"treeleft" , x)
        del(`#${unbalparent}treeleft` , `#${y}treetop`);
        mySVG.redrawLines();
      }

    

    return x;  

    // Return new root  
  
}  
  

function leftRotate(x)  
{  

  let unbalparent = parent[x];

  


    let y = tree[`${x}treeright`];
    let T2 = tree[`${y}treeleft`];  
  
    
    // Perform rotation  
    del(`#${x}treeright` , `#${y}treetop`);
    mySVG.redrawLines();
    treefy(y+"treeleft" , x)

    if (T2 != "null"){ 
      treefy(x+"treeright" , T2) 
      del(`#${y}treeleft` , `#${T2}treetop`);
   mySVG.redrawLines();


}

else tree[x+"treeright" ] = T2;
    
  
  
    // Update heights  
    let xheight = Math.max(height(tree[`${x}treeleft`]),  height(tree[`${x}treeright`])) + 1;  
    $(`#${x}height`).text(xheight)

    let yheight = Math.max(height(tree[`${y}treeleft`]),  height(tree[`${y}treeright`])) + 1;  
    $(`#${y}height`).text(yheight)

    // Return new root 
    r = y;

    if (unbalparent != undefined) {
    if ( parseInt( $(`#${unbalparent}treeval`).text() ,10)   <  parseInt($(`#${x}treeval`).text(),10) )  {
    treefy(unbalparent+"treeright" , y)
    del(`#${unbalparent}treeright` , `#${x}treetop`);
    mySVG.redrawLines();
    }

    else {

      treefy(unbalparent+"treeleft" , y)
      del(`#${unbalparent}treeleft` , `#${x}treetop`);
      mySVG.redrawLines();
    }
  }

    return y;  
}  
  


function getBalance(N)  
{  
    if (N == "null")  return 0;  

    return (height(tree[`${N}treeleft`]) -  height(tree[`${N}treeright`]));  
}  


async function insertavl(node_, key_) { 


    if ($(`#${node_}`).length == 0)  {

      await display("due to the space-issues, you are in the middle of the document screen for AVL tree opeartion.");
      await display("please scroll back to leftmost to use other algorithms.");
      await display("Tree Empty. Adding root node.");
      let vid =count;
     await  avl(key_); 
       $(`#${vid}`).css({ "top" : "0px", "left" : "0px","transition" : "2000ms"})
       $(`#${vid}`).animate({ "top" : "0px", "left" : "1900px"})

       let bodyy = $(document);

       bodyy.scrollLeft(1200)



       return;
    }


    await hilight(node_, "rgb(109,209,0,1)" , "1200ms" , 1300 )
    hilight(node_, defaultcolor , "1200ms" , 1300 )


 
    /* Otherwise, recur down the tree */
    if (key_ <  parseInt( $(`#${node_}treeval`).text() , 10) ) {

            if (tree[`${node_}treeleft`] == "null") {

              await display("Correct place to insert the element = CurrentNode->left")
        let vid = count;
      await  avl(key_);
     $(`#${vid}`).css({ "top" : "0px", "left" : "0px","transition" : "0ms"})
     $(`#${vid}`).offset({top: ($("#"+node_).offset().top+150 ) , left :($("#"+node_).offset().left-110) })


        await new Promise(resolve => {


          setTimeout(()=> {
            treefy(`${node_}treeleft` ,vid)
            
            resolve('')
            
           },500)
            


        })
     
        
      
             }

             Log("Item smaller then current node, going left")

    await insertavl(tree[`${node_}treeleft`], key_);

      
    }
   
   
    else if (key_ >  parseInt( $(`#${node_}treeval`).text() , 10) )  {


               if (tree[`${node_}treeright`] == "null") {

                await display("Correct place to insert the element = CurrentNode->right")
        let vid = count;
        avl(key_);


        $(`#${vid}`).css({ "top" : "0px", "left" : "0px","transition" : "0ms"})
        $(`#${vid}`).offset({top: ($("#"+node_).offset().top+150 ) , left :($("#"+node_).offset().left+80) })


        await new Promise(resolve => {


          setTimeout(()=> {
            treefy(`${node_}treeright` ,vid)
            
            resolve('')
            
           },500)
            


        })
      
                 }


                 Log("Item larger then current node, going right")
                 await   insertavl(tree[`${node_}treeright`], key_); 

      
    }


    let nodeheight = 1 + Math.max(height(tree[`${node_}treeleft`]), height(tree[`${node_}treeright`]));
    $(`#${node_}height`).text(nodeheight)




    let balance =  getBalance(node_);  

   // Output("balance" + balance + "  node  "+ node_ )

   let lnode = tree[`${node_}treeleft`];
   let rnode = tree[`${node_}treeright`];

    let leftkey = $('#'+lnode+"treeval").text() ;
    let rightkey = $('#'+rnode+"treeval").text() ;

//



    if (balance > 1 && key_ <  parseInt( leftkey , 10))   {
    

    
        let returned= rightRotate(node_);  
        
        return returned;

    }
  
    // Right Right Case  
    if (balance < -1 && key_ > parseInt( rightkey ,10))   {
   
     
 
        let returned= leftRotate(node_); 



        return returned;  


    }
  
    // Left Right Case  
    if (balance > 1 && key_ > parseInt( leftkey ,10))  
    {  

    
  

        let newnodeleft = leftRotate(tree[`${node_}treeleft`]);

        let optiona = tree[`${node_}treeleft`];

        del (`#${node_}treeleft` , `#${optiona}treetop`);

         treefy(`${node_}treeleft`, newnodeleft);

        return rightRotate(node_);  


        
    }  
  
    // Right Left Case  
    if (balance < -1 && key_ < parseInt( rightkey,10))  
    {  


     
     
        let newnoderight = rightRotate(tree[`${node_}treeright`]);
 let optiona = tree[`${node_}treeright`];

        del(`#${node_}treeright` , `#${optiona}treetop`);

        treefy(`${node_}treeright`, newnoderight);

        return leftRotate(node_);  
    }  



    r = node_
return node_;
    
} 
  




function avl(element) {

    newnode = '<div id="'+count+'" style="transition:200ms;"  class="dragg" > <div class="treenode" id="'+ count+"treetop" +'" style="margin-left:35px;"></div>  <div class="treenode" id="'+ count+"treeleft" +'" style="margin-left:18px; margin-top:70px;"></div>   <div class="treenode" id="'+ count+"treeright" +'" style="margin-left:54px; margin-top:70px;"></div> <p  style="position:absolute;color:coral; font-size:70%; left:20px;" id="'+ count+"bottom" +'">'+count +'</p>   <div style="position:absolute; text-align:center; top:65px; left:38px;height:1px; width:20px;"><p  style="color:white; font-size:70%; " id="'+ count+"height" +'">'+"1" +'</p></div>   <p  id="'+ count+"treeval" +'" class="t">'+element+'</p>   </div>';


   $("body").prepend(newnode)
   $("#"+count).draggable();

   tree[count+"treeleft"] = "null"
   tree[count+"treeright"] = "null"

   divbyelement[element] = count

   count = count +1;
   counttreenodes = counttreenodes + 1;


 }




 

// Level-order-traverse

async function  printLevel(root_,  level)
{
 
	if (root_ == "null")
		return false;

	if (level == 1)
	{
  //  Output( $('#'+root_+"treeval").text());
    
  let lefttarget = tree[`${root_}treeleft`];
  let righttarget = tree[`${root_}treeright`];




  let rootoffset = $("#"+root_).offset()

  if (lefttarget != "null" ) {

  //chlc(`${root_}treeleft` , `${lefttarget}treetop` , "rgba(0,0,0,0)")
  

 $(`#${lefttarget}`).offset({"top" : `${rootoffset.top+150}` , "left" : `${ rootoffset.left - (110)}` })

    await new Promise ( resolve => {

setTimeout(()=> {
  mySVG.redrawLines();
 resolve('');

},1000)

    })

   
  }

  if (righttarget != "null" ) {

   // chlc(`${root_}treeright` , `${lefttarget}treetop` , "rgba(0,0,0,0)")
  $(`#${righttarget}`).offset({"top" : `${rootoffset.top+150}` ,  "left" : `${ rootoffset.left+ (height(righttarget)*130)}`})
     
    await new Promise( resolve => {

    
     setTimeout(()=> {
      mySVG.redrawLines();
   resolve('');
     
     },1000)
     
         })


  }
  //mySVG.kruskalize("coral");




		// return true if at-least one node is present at given level
		return true;
	}

	let left = await printLevel(   tree[`${root_}treeleft`], level - 1);
	let right = await printLevel( tree[`${root_}treeright`], level - 1);

	return left || right;
}

// Function to print level order traversal of given binary tree
async function BalanceAll( root_)
{
	// start from level 1 -- till height of the tree
	let level = 1;

	// run till printLevel() returns false
	while ( await printLevel(root_, level))
    level++;
    


    setTimeout( mySVG.redrawLines , 100);

    
}

async function InsertAVL (jj,h) {

await insertavl(jj,h);

setTimeout(await BalanceAll(r), 100);



}



//            insertavl(0,65)