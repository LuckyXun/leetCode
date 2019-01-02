//201. Bitwise AND of Numbers Range
var rangeBitwiseAnd = function(m, n) {   
    while(n > m){
        n = n & (n-1);
    }
    return n;
};
