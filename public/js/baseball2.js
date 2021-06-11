
function init_arr() { //숫자 야구
    for (i = 0; i < 10; i++) {
        arr[i] = new Array(10);
        for (j = 0; j < 10; j++) {
            arr[i][j] = new Array(10);
            for (k = 0; k <10; k++) {
                arr[i][j][k] = new Array(10);
                for(l = 0; l<10; l++) {
                    arr[i][j][k][l] = i*1000 + j*100 + k*10 + l;
                    if (i == j || i == k || i == l || j == k || j == l || k == l)
                        arr[i][j][k][l] = -1;
                }
            }
        }
    }
}

function random_number() { //숫자 야구
    /*if(count <= 0) {
        result.textContent = "남은 경우의 수가 없습니다... 중간에 잘못 입력하셨어요!";
        return false;
    }*/
    do {
        b = Math.floor(Math.random() * 10);
        c = Math.floor(Math.random() * 10);
        d = Math.floor(Math.random() * 10);
        e = Math.floor(Math.random() * 10);
    } while (arr[b][c][d][e] == -1 || arr[b][c][d][e] == 0);
    if(b == 0)
        result.textContent = '0' + arr[b][c][d][e] + ' 인가요?';
    else
        result.textContent = arr[b][c][d][e] + ' 인가요?';
    count--;
}