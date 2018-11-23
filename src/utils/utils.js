export default{
    interval (methods,timeout) {
        console.log("定时器调用")
        methods
        const timer = setInterval(() =>{                    
            this.interval()     
        }, timeout);  
    }
  }
