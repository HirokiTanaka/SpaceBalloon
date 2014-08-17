var app = function() {

    var timer = null;
    var video = document.getElementsByTagName('video')[0];

    var initialize = function() {
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia = navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia
            || navigator.msGetUserMedia;
            
        if (!navigator.getUserMedia) {
            alert('getUserMedia not supported!!');
            return;
        }
        $('#btn_start').on('click', function() {
            $(this).attr('disabled', true);
            captureVideo();
        });
    };
    
    var captureVideo = function() {
        navigator.getUserMedia(
            { video: true }
            , startCapture
            , onGetUserMediaError
        );
    };
    
    var startCapture = function(stream) {
    
        alert('start capture called!');
    
        // video要素に対して、カメラからのストリームを設定
        video.src = window.URL.createObjectURL(stream);
        
        // 一定間隔で画像を取得する。
        // 取得したら、"imageupdate"イベントをfireする。
        timer = setInterval(function(){
            try {
                // キャンバスノードの生成
                var cvs = document.createElement('canvas');
                cvs.width = video.width;
                cvs.height = video.height;
                var ctx = cvs.getContext('2d');
                
                // キャンバスに描画
                ctx.drawImage(video, 0, 0, 240, 400, 0, 0, video.width, video.height);
                
                // データ取得（これを保存する）
                // var data = cvs.toDataURL('image/jpeg');
            } catch(e) {
                onGetUserMediaError(e);
            }
        }, 1000);
    };
    
    var onGetUserMediaError = function(error) {
       alert("Error: [CODE " + error.code + "]");
       if(timer)
           clearInterval(timer);
    };
    
    return {
        initialize: initialize
    };
};
