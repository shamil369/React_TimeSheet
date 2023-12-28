const jwtToken = jwt.verify(req.body.tokenjson,secret);
console.log("verified token:",jwtToken)
let email = jwtToken.email
Task.find({email}).then((taskData)=>{
    console.log("taskdata from DB",taskData);
    taskData.map((obj)=>{
    let currentDate = Date.now();
    let deadlineDate = new Date(obj.deadline)
    if (currentDate > deadlineDate){
        let objID = obj._id;
        
        Task.findByIdAndUpdate({_id:objID},{$set:{status:"pending"}}).then((updatedPendingData)=>{
            res.json()
        })
    }
    res.json(taskData)
    })
})