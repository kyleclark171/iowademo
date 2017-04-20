Array.prototype.containsString = function(str) {
    
    if(str && typeof str == 'string'){
        for (i = 0; i < this.length; i++) {
            if(this[i] && this[i] === str){
                return true;
            }  
        }
    } else{
        throw "Invalid Argument";
    }
    return false;
};