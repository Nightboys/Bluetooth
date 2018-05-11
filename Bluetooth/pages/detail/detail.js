var app = getApp();
// const util = require('../../index/index.js');

Page({

    /**
     * 页面的初始数据
     * serviceId = "0000fff0-0000-1000-8000-00805f9b34fb";                             * characteristicId_TX = "0000fff1-0000-1000-8000-00805f9b34fb";  //写
     * characteristicId_RX = "0000fff2-0000-1000-8000-00805f9b34fb";  //读  
     */
    data: {
        deviceId: '',
        name: '',
        deviceId_Tx: '',
        serviceId: '0000FEE0-0000-1000-8000-00805F9B34FB',
        characteristicId: '0000FEE1-0000-1000-8000-00805F9B34FB',

        //此处deviceId和characteristicId需完全匹配，字母应全部大写
        
        // deviceId_Tx: 'D4:F5:13:6E:C3:C8',
        // serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB',//特征值对应服务的uuid
        // characteristicId: '0000FFF1-0000-1000-8000-00805F9B34FB', //特征值uuid  

        CMD_OPEN: [115, 16, 16],     //开机
        CMD_CLOSE: [115, 17, 17]     //关机   
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            deviceId: options.deviceId,
            name: options.name,
            deviceId_Tx: options.deviceId
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.closeConnect();
    },

    /**
     * 断开连接
     */
    closeConnect: function (e) {
        var that = this;
        wx.stopBluetoothDevicesDiscovery({
            success: function (res) {
                console.log('停止搜索附近的蓝牙设备', res)
            }
        });

        wx.closeBLEConnection({
            deviceId: that.data.deviceId,
            success: function (res) {
                console.log('断开已连接设备', res);

                wx.showToast({
                    title: '连接已断开',
                    icon: 'success'
                });

                setTimeout(function () {
                    wx.navigateBack();
                }, 2000)
            }
        });

    },


    /**
     * 发送数据-开机
     */
    openMsg: function () {
        var that = this;
        that.getCharacter(that.data.CMD_OPEN);
    },

    /**
     * 关机
     */
    closeMsg: function () {
        var that = this;
        that.getCharacter(that.data.CMD_CLOSE);
    },

    //读取服务的特征值
    getCharacter: function (order) {
        var that = this;

        /* services.forEach(function (value, index) {
            if (value.uuid == that.data.serviceId) {
                that.setData({
                    serviceId: value.uuid
                })
                console.log('value的值',value);
                console.log('serviceId的值', that.data.serviceId);
            }
        }); */

        wx.getBLEDeviceCharacteristics({
            deviceId: that.data.deviceId_Tx,
            // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
            serviceId: that.data.serviceId,   //蓝牙服务 uuid
            success: function (res) {
                console.log('该设备的MAC', that.data.serviceId);
                console.log('该ID设备的特征值', res);

                setTimeout(function () {
                    that.writeCharacter(order);
                    that.openNotifyService();
                }, 1000)
            },
            fail: function (res) {
                console.log('获取特征值失败', res);
                console.log('serviceId的值', that.data.serviceId);
                // wx.showToast({
                //     title: '蓝牙设备不匹配',
                // });

                wx.showModal({
                    title: '错误信息',
                    content: "errCode:"+res.errCode+"\n"+"errMsg:"+res.errMsg,
                })

                setTimeout(function () {
                    wx.hideToast();
                }, 2000);
            }
        })
    },

    //发送数据给蓝牙设备--注意：必须设备的特征值支持write才可以成功调用
    writeCharacter: function (order) {
        var that = this;
        var buffer = that.hexStringToArrayBuffer(order);    //测试数据

        wx.writeBLECharacteristicValue({
            // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
            deviceId: that.data.deviceId_Tx,
            // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
            serviceId: that.data.serviceId,
            // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
            characteristicId: that.data.characteristicId,
            // 这里的value是ArrayBuffer类型
            value: buffer,
            success: function (res) {
                console.log('数据发送成功', res.errMsg);

                wx.showToast({
                    title: '发送成功',
                });
                setTimeout(function () {
                    wx.hideToast();
                }, 2000)
            },
            fail: function (res) {
                console.log('数据发送失败', res.errMsg);
                wx.showToast({
                    title: '发送失败',
                });
                setTimeout(function () {
                    wx.hideToast();
                    // that.writeCharacter();//发送失败，重新发送
                }, 2000)
            }
        })
    },

    //将需要发送的数据转换成二进制
    hexStringToArrayBuffer: function (str) {
        if (!str) {
            return new ArrayBuffer(0);
        }

        console.log("数据转码之前", str)

        // 要创建的 ArrayBuffer 的大小，单位为字节。
        var buffer = new ArrayBuffer(str.length);
        //ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
        var dataView = new DataView(buffer);

        //写入通道指令 
        for (var k = 0; k < str.length; k++) {
            dataView.setUint8(k, str[k]);
        }

        // CMD_OPEN: [115, 16, 16]
        var dataResult = [];
        for (var i = 0; i < dataView.byteLength; i++) {
            dataResult.push("0x" + dataView.getUint8(i).toString(16));
        }
        console.log("数据转码之后", dataResult);

        return buffer;
    },

    //启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
    openNotifyService: function () {
        var that = this;
        wx.notifyBLECharacteristicValueChange({
            state: true, // 启用 notify 功能
            // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  
            deviceId: that.data.deviceId,
            // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
            serviceId: that.data.serviceId,
            // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
            characteristicId: that.data.characteristicId,
            success: function (res) {
                console.log('notify启动成功', res);
                that.characteristicValueChange();   //监听特征值变化
            },
            fail: function (res) {
                console.log('notify启动失败', res)
            }
        })
    },

    //监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification
    characteristicValueChange: function () {
        wx.onBLECharacteristicValueChange(function (res) {
            console.log("特征值变化", res);
            console.log(ab2hext(res.value));
        })
    },

    // ArrayBuffer转16进度字符串示例
    ab2hex: function (buffer) {
        var hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function (bit) {
                return ('00' + bit.toString(16)).slice(-2)
            }
        )
        return hexArr.join('');
    }

})