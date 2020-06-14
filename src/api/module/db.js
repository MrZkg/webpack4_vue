const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient; //属性 类型是一个对象
function _connect(cb){
  mongoClient.connect('mongodb://127.0.0.1:27017',{ useUnifiedTopology: true}, function(err, client){
    if(err){
      console.log('数据库连接失败')
    } else {
      const db = client.db('school');//你要操作的数据库
      cb(db)
    }
  })
}

//插入一条数据
function insertOne(coll,insertObj,cb){
  _connect(function(db){
    db.collection(coll).insertOne(insertObj,function(err,results){
      cb(err,results)
    })
  })
}
// insertOne("students",{name:"dhf",age:22},function(err,results){
//   if(err){
//     console.log("添加失败");
//   } else {
//     console.log("添加成功");
//   }
// })

//插入多条
function insertMany(coll,insertObj,cb){
  _connect(function(db){
    db.collection(coll).insertMany(insertObj,function(err,results){
      cb(err,results)
    })
  })
}
// insertMany("students",[{name:"dhf",age:22},{name:"zs",age:2}],function(err,results){
//   if(err){
//     console.log("添加失败");
//   } else {
//     console.log("添加成功");
//   }
// })


//删除一条数据
function deleteOne(coll,deleteObj,cb){
  _connect(function(db){
    db.collection(coll).deleteOne(deleteObj,function(err,results){
      cb(err,results)
    })
  })
}
// deleteOne("students",{name:"dhf"},function(err,results){
//   if(err){
//     console.log('删除失败');
//   } else {
//     console.log('删除成功');
//   }
// })


//删除多条数据
function deleteMany(coll,deleteObj,cb){
  _connect(function(db){
    db.collection(coll).deleteMany(deleteObj,function(err,results){
      cb(err,results)
    })
  })
}
// deleteMany("students",{age:22},function(err,results){
//   if(err){
//     console.log('删除失败');
//   } else {
//     console.log('删除成功');
//   }
// })

//  更新一条  没有实现  ？？/?/?
function updateOne(coll,insertObj,cb){
  _connect(function(db){
    db.collection(coll).updateOne(insertObj,function(err,results){
      cb(err,results)
    })
  })
}     
// updateOne("students",[{age:2},{$set:{name:'王百万'}}],function(err,results){
//   if(err){
//     console.log("修改失败");
//   } else {
//     console.log("修改成功");
//   }
// })