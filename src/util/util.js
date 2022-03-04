//判断俩个日期之前相差多少天
import XLSX from "xlsx";
export function daysBetween(sDate1, sDate2) {
  var time1 = Date.parse(new Date(sDate1));
  var time2 = Date.parse(new Date(sDate2));
  var nDays = Math.abs(parseInt((time2 - time1)/1000/3600/24));
  return nDays+1;

}
export function getNowData() {
  let date = new Date();
  let n = date.getFullYear();
  let m = date.getMonth()+1;
  let d = date.getDate();
  let H = date.getHours();
  let M = date.getMinutes();
  let S = date.getSeconds();
  m = m >= 10 ? m : '0'+m;
  d = d >= 10 ? d : '0'+d;
  return n + '-' + m + '-' + d

}
//算距离某天没有多少天
export function mschange(startData) {
  let old = new Date(startData).getTime();
  let now = new Date().getTime();
  let num = now - old;
  let num1 = parseInt(num / 1000);
  let miao = parseInt(num1 % 60);//秒
  let minute = parseInt((num1 / 60) % 60);//分
  let hour = parseInt((num1 / 60 / 60) % 24);//小时
  let day = parseInt(num1 / 60 / 60 / 24);//天
  return {
    'miao': miao,
    'minute': minute,
    'hour': hour,
    'day': day
  }
}
//解析excl
export function file2Xce(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e) {
      const data = e.target.result;
      this.wb = XLSX.read(data, {
        type: "array"
      });
      const result = [];
      this.wb.SheetNames.forEach(sheetName => {
        result.push({
          sheetName: sheetName,
          sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
        });
      });
      resolve(result);
    };
    // reader.readAsBinaryString(file.raw);
  });
}
//检查返回搜索数据是否有匹配项
export function changeSelect(val,data,type) {
  let arr = [];
  for(let i=0,len=data.length;i<len;i++){
    if(val.indexOf(data[i].id) > -1){
      arr.push(data[i].id)
    }
  }
  if(type == 'num'){
    return arr[0]
  }else{
    return arr
  }

}
