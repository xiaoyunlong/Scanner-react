import React from "react";
import Quagga from "quagga";
import "./index.css";

class BarcodeScanner extends React.Component{


    handleDecode = () => {
        let src;
        let input = document.querySelector(".controls input[type=file]");
            if (input.files && input.files.length) {         
                src = URL.createObjectURL(input.files[0]);
            }
        const config = {
            inputStream: {
            size: 800,
            singleChannel: false
            },
            locator: {
                patchSize: "medium",
                halfSample: true
               },
             decoder: {
                readers: [{
                     format: "code_39_reader",
                     config: {}
                    }]
                },
             locate: true,
              src: src
       }

       Quagga.decodeSingle(config, function(result) {
                if(!result){
                   alert("图片中没有条形码！");
                   return false;
                }
                //识别结果
                if(result.codeResult){
                    console.log("图片中的条形码为："+result.codeResult.code);
                    alert("图片中的条形码为：" + result.codeResult.code);
                }else{
                    alert("未识别到图片中的条形码！");
                }
       });
}
    render(){
        return(
            <div>
                <section id="container" className="container">
                    <div className="controls">
                        <input type="file" accept="image/*;capture=camera"/>
                        <button id="btnIdents" onClick={this.handleDecode}>识别</button> 
                    </div>
                    <div id="interactive" className="viewport"><br clear="all"/></div>
                </section> 
            </div>
        );
    }
}
export default BarcodeScanner;