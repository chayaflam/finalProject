export function getChildrenByTeacherId(data){
    return ` select * from finalProjectDb.child where childrenclassid= (SELECT idChildrenClass FROM finalProjectDb.childrenclass WHERE teacherId = ${data} );`;
 }