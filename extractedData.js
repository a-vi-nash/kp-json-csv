module.exports = JSONData =>{
      let kps = JSONData.answer_sets;
      let csvData = [];

      kps.forEach(kp=>{
          //extract the name of KP
          let name = kp.name.replace(/\"/g,"'");

          //extract the training data of KP
          let trainingData = extractTrainingData(kp.training_data);

          //extract the content of the KP
          let content = extractContent(kp.answers);
          csvData.push("\""+name+"\",\""+trainingData+"\",\""+content+"\"");
      })
      return csvData;
}


let extractTrainingData = trainigData =>{
  return trainigData.reduce((acc,item)=>{
      acc.push(item.value)
      return acc;

  },[]).join();
}

let extractContent = answerArr =>{
    
    return answerArr.reduce((acc,ans)=>{
        let msgArr = ans.messages;
        msgArr.forEach(item=>{
          let contentType = item.content_type;
          let content = [];
          if(contentType == "text"){
            content.push((item.content.value || "").replace(/\"/g,"'"));
          }
          else if(contentType == "card"){
            content.push("title:"+(item.card.title.value || "").replace(/\"/g,"'"));
            content.push("description:"+(item.card.description.value||"").replace(/\"/g,"'"));
            content.push("links:"+getCardLinks(item.card.links));
          }
          acc.push(content.join(" "));
        })        
        return acc;
    },[]).join("\n\n");
}


let getCardLinks = links=>{
    if(!links || links.length == 0){
      return "";
    }
    return links.reduce((acc,item)=>{
        let linkData = [];
        linkData.push("type:"+item.type);
        linkData.push("title:"+(item.title.value||"").replace(/\"/g,"'"));
        linkData.push("content:"+(item.content||"").replace(/\"/g,"'"));
        acc.push(linkData.join(" "));
        return acc;
    },[]).join("\n");
}

