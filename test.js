UploadPhoto() {
        console.log('id', uid);
        const url = "https://flowey-server.herokuapp.com/upimg";  //url เชื่อม api กับ database
        const image = {
            uri: this.state.photo.uri,
            type: 'image/jpg', 
            name: this.state.photo.fileName
        }   //dict รูปภาพ ประกอบไปด้วย ตำแหน่งของรูป,ชนิดของไฟล์,ชื่อไฟล์
        const imgBody = new FormData(); //form ในการส่งรูปประกอบไปด้วย รูป และ user id 
        imgBody.append('Image', image);
        imgBody.append('uid', uid);
        imgBody.append('filename', this.state.photo.fileName);
        console.log('imgBody:', imgBody);
     // console.log('photo',this.state.photo)
        console.log('filename',this.state.photo.fileName)
        fetch(url, {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: imgBody
        }) //ติดต่อ api ส่งรูปภาพไปยัง cloud ซึ่งดึงได้แค่ทีละรูป จึงต้องสร้าง form เพื่อใช้เป็น pattern ในการส่งรูป
            .then((response) => {
                console.log('response upload', response);
                alert("อัพโหลดเสร็จเรียบร้อย")  //เช็คสถานะการอัพโหลด หากสำเร็จให้ alert successful
                this.setState({ isdisabled: false, bgColor: true });
            })
            .catch((error) => {
                console.error(error);
                alert("เกิดความผิดพลาด")
                this.setState({ photo: null });
            });
     }