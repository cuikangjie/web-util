/**
 * Created by kin on 2016/12/20.
 */
(function (window) {
    'user strict';
    var setData,getData,getAllData,keys,getLength,removeData,clearStorage;
    setData=function (key,data,ls) {
        typeof data === 'string' ? (function (key,data,window) {
            ls.setItem(key,data);
        })(key,data,window) : (function (key,data,window) {
            ls.setItem(key,JSON.stringify(data));
        })(key,data,window)
    };
    getData=function (key,type,ls) {
        if(type && type === 'string'){
            return ls.getItem(key)
        }else {
            try{
                return JSON.parse(ls.getItem(key));
            }catch(e) {
                return ls.getItem(key);
            }
        }
    };
    getLength=function (ls) {
      return ls.length;
    };
    keys=function (ls) {
      var l=getLength(ls);
      var out = [];
      for(var i=0;i<l;i++){
            out.push(ls.key(i))
      }
      return out;
    };
    getAllData=function (ls) {
      var ks=keys(ls);
      var ot={};
      ks.forEach(function (key) {
        ot[key]=getData(key,undefined,ls);
      });
      return ot;
    };
    removeData=function (key, ls) {
      ls.removeItem(key);
    };
    clearStorage=function (ls) {
      ls.clear();
    };
    var ul={};
    if(window.localStorage){
       ul.setData=function (key,value) {
           setData(key,value,window.localStorage);
       };
       ul.getData=function (key,type) {
          return  getData(key,type,window.localStorage)
       };
       ul.getAllData=function () {
          return  getAllData(window.localStorage);
       };
       ul.keys=function () {
           return keys(window.localStorage);
       };
       ul.getLength=function () {
           return getLength(window.localStorage);
       };
       ul.removeData=function (key) {
           removeData(key,window.localStorage);
       };
       ul.clearStorage=function () {
           clearStorage(window.localStorage);
       };
       if(window.sessionStorage){
           ul.session={};
           ul.session.setData=function (key,value) {
               setData(key,value,window.sessionStorage);
           };
           ul.session.getData=function (key,type) {
               return  getData(key,type,window.sessionStorage)
           };
           ul.session.getAllData=function () {
               return  getAllData(window.sessionStorage);
           };
           ul.session.keys=function () {
               return keys(window.sessionStorage);
           };
           ul.session.getLength=function () {
               return getLength(window.sessionStorage);
           };
           ul.session.removeData=function (key) {
               removeData(key,window.sessionStorage);
           };
           ul.session.clearStorage=function () {
               clearStorage(window.sessionStorage);
           };
       }
    }else{
        console.info('该浏览器不支持！')
    }
    window.StorageUtil=ul;
})(window);
