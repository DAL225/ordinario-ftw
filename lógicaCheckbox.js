function maximoNum(input){
    const max = parseFloat(input.max);
    if (parseFloat(input.value) > max){
        input.value = max;
    }
}