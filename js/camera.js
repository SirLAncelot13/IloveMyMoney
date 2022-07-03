class Camera {
    constructor(videoNode){
        this.videoNode = videoNode;
        this.stream = null;
        this.photo = null;
        this.photoBlob = null;
    }

    encender(){
        if(navigator.mediaDevices){
            this.apagar();
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 200, 
                    height: 200,
                    facingMode: 'user'
                }
            }).then(stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true
            }).catch(err => {
                console.log(err);
                return false
            });
        }else{
            alert("No cuentas con dispositvos multimedia")
            return false
        }
    }

    encenderBack(){
        if(navigator.mediaDevices){
            this.apagar();
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 200, 
                    height: 200,
                    facingMode: {
                        exact: 'environment'
                    }
                }
            }).then(stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true
            }).catch(err => {
                console.log(err);
                return false
            });
        }else{
            alert("No cuentas con dispositvos multimedia")
            return false
        }
    }

    apagar(){
        if(this.videoNode){
            this.videoNode.pause();
            if(this.stream){
                this.stream.getTracks().forEach(track => {
                    track.stop();
                })
            }
        }
    }

    async takePhoto(){
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 200);
        canvas.setAttribute('height', 200);

        let context = canvas.getContext('2d');
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

        this.photo = context.canvas.toDataURL();
        let photoObj = {
            photo: this.photo
        }

        photoObj.photoBlob = await this.getCanvasBlob(context.canvas)

        canvas= null;
        context = null;

        this.videoNode.removeAttribute('src');
        this.videoNode.load()

        return photoObj;
    }

    getCanvasBlob(canvas) {
        return new Promise(function(resolve, reject){
            canvas.toBlob((blob) => {
                resolve(blob)
            })
        } )
    }
}