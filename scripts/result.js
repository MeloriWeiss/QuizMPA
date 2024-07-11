(function() {
    const Result = {
        toAnswers: null,
        init() {
            document.getElementById('result-score').innerText =
                `${sessionStorage.getItem('score')}/${sessionStorage.getItem('total')}`;
            this.toAnswers = document.getElementById('to-answers').onclick = function() {
                location.href = 'answers.html';
            }

            // const url = new URL(location.href);
            // document.getElementById('result-score').innerText =
            //     `${url.searchParams.get('score')}/${url.searchParams.get('total')}`;
            // this.toAnswers = document.getElementById('to-answers').onclick = function() {
            //     location.href = 'answers.html' + location.search;
            // }
        }
    }

    Result.init();
})();