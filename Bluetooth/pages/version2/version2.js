var app = getApp();
var temp = [];
var string_temp = "";
var serviceId = "0000FEE0-0000-1000-8000-00805F9B34FB";
var characteristicId = "0000FEE1-0000-1000-8000-00805F9B34FB";

Page({
    data: {
        isbluetoothready: false,
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false,
        searchingstatus: false,
        receivedata: '666',
        onreceiving: false,
        id_text: string_temp,
        list: [],
        receive_data: 'none  '
    },
    onLoad: function () {

    },
    open_BLE: function () {
        var that = this;

        that.setData({
            isbluetoothready: !that.data.isbluetoothready
        })
        if (that.data.isbluetoothready) {   //蓝牙开关打开
            //开启蓝牙模块并初始化  
            wx.openBluetoothAdapter({
                success: function (res) {
                    console.log("蓝牙已打开", res);
                },
                fail: function (res) {
                    wx.showModal({
                        title: '提示',
                        content: '请检查手机蓝牙是否打开',
                    })
                }
            });

            //检查蓝牙模块是否初始化成功  
            wx.getBluetoothAdapterState({
                success: function (res) {
                    var available = res.available
                    if (!available) {
                        setTimeout(function(){
                            that.search_BLE();
                        },1000)
                    }
                    else {
                        wx.showToast({
                            title: '蓝牙初始化成功',
                            icon: 'success',
                            duration: 2000
                        });
                        console.log("蓝牙初始化成功", res);
                    }
                }
            });

        }
        else {                          //蓝牙开关关闭
            wx.closeBLEConnection({
                deviceId: that.data.connectedDeviceId,
                complete: function (res) {
                    that.setData({
                        deviceconnected: false,
                        connectedDeviceId: ""
                    })
                    wx.showToast({
                        title: '蓝牙连接断开',
                        icon: 'success',
                        duration: 2000
                    })
                }
            });
            setTimeout(function () {
                that.setData({
                    list: []
                })
                //释放蓝牙适配器  
                wx.closeBluetoothAdapter({
                    success: function (res) {
                        that.setData({
                            isbluetoothready: false,
                            deviceconnected: false,
                            devices: [],
                            searchingstatus: false,
                            receivedata: ''
                        })
                        wx.showToast({
                            title: '蓝牙适配器释放',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: function (res) {

                    }
                })
                //释放蓝牙适配器  
            }, 1000)
        }
    },

    search_BLE: function () {
        temp = []
        var that = this
        if (!that.data.searchingstatus) {
            var that = this
            //开始搜索附近蓝牙设备  
            wx.startBluetoothDevicesDiscovery({
                success: function (res) {
                    wx.showToast({
                        title: '开始搜索BLE',
                        icon: 'loading',
                        duration: 2000
                    });

                    console.log("开始搜索附近蓝牙设备", res);

                    that.setData({
                        searchingstatus: !that.data.searchingstatus
                    })
                }
            });

            //获取发现的蓝牙设备
            setTimeout(function () {
                //获取发现的蓝牙设备  
                wx.getBluetoothDevices({
                    success: function (res) {
                        for (var i = 0; i < 100; i++) {
                            if (res.devices[i]) {
                                string_temp = string_temp + '\n' + res.devices[i].deviceId
                            }
                        };

                        console.log("获取发现的蓝牙设备", res);

                        var dataList = [];
                        for (var k = 0; k < res.devices.length; k++) {
                            var obj = { name: res.devices[k].name, deviceId: res.devices[k].deviceId, connectState: false };
                            dataList.push(obj);
                        }

                        that.setData({
                            id_text: string_temp,
                            list: dataList
                        })
                    }
                });

            }, 1000)

        } else {
            //停止搜索附近蓝牙设备  
            wx.stopBluetoothDevicesDiscovery({
                success: function (res) {
                    wx.showToast({
                        title: '停止搜索BLE',
                        icon: 'success',
                        duration: 2000
                    });
                    that.setData({
                        searchingstatus: !that.data.searchingstatus
                    })
                }
            })

        }
    },

    connectTO: function (e) {
        var that = this;

        //停止搜索附近蓝牙设备  
        wx.stopBluetoothDevicesDiscovery({
            success: function (res) {
                that.setData({
                    searchingstatus: !that.data.searchingstatus
                })
            }
        });

        wx.showLoading({
            title: '连接蓝牙设备中...',
        });

        console.log("点击设备", e);

        wx.createBLEConnection({
            deviceId: e.currentTarget.id,
            success: function (res) {
                wx.hideLoading();
                wx.showToast({
                    title: '连接成功',
                    icon: 'success',
                    duration: 1000
                });

                console.log("连接成功", res);

                setTimeout(function(){
                    var newList = that.data.list;
                    for (var i = 0; i < newList.length; i++) {
                        if (newList[i].deviceId == e.currentTarget.id) {
                            newList[i].connectState = !newList[i].connectState;
                        }
                    }

                    that.setData({
                        deviceconnected: !that.data.deviceconnected,
                        connectedDeviceId: e.currentTarget.id,
                        list: newList
                    });

                },1000);


                setTimeout(function () {
                    wx.getBLEDeviceServices({
                        deviceId: that.data.connectedDeviceId,
                        success: function (res) {
                            console.log('获取服务信息', res);

                            setTimeout(function () {
                                //获取蓝牙设备某个服务中的所有 characteristic（特征值）
                                wx.getBLEDeviceCharacteristics({
                                    deviceId: that.data.connectedDeviceId,
                                    serviceId: serviceId,
                                    success: function (res) {
                                        console.log('获取特征值', res);
                                    }
                                })

                            }, 1000);
                        }
                    })
                }, 1000);

                // ArrayBuffer转为16进制数  
                function ab2hex(buffer) {
                    var hexArr = Array.prototype.map.call(
                        new Uint8Array(buffer),
                        function (bit) {
                            return ('00' + bit.toString(16)).slice(-2)
                        }
                    )
                    return hexArr.join('');
                }
                // 16进制数转ASCLL码  
                function hexCharCodeToStr(hexCharCodeStr) {
                    var trimedStr = hexCharCodeStr.trim();
                    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
                    var len = rawStr.length;
                    var curCharCode;
                    var resultStr = [];
                    for (var i = 0; i < len; i = i + 2) {
                        curCharCode = parseInt(rawStr.substr(i, 2), 16);
                        resultStr.push(String.fromCharCode(curCharCode));
                    }
                    return resultStr.join("");
                }

                //监听特征值回调，接收数据  
                wx.onBLECharacteristicValueChange(function (characteristic) {
                    var hex = ab2hex(characteristic.value)
                    that.setData({
                        receive_data: hexCharCodeToStr(hex)
                    })
                })
            },
            fail: function (res) {
                wx.hideLoading()
                wx.showToast({
                    title: '连接设备失败',
                    icon: 'success',
                    duration: 1000
                });

                console.log("连接设备失败", res);

                that.setData({
                    connected: false
                })
            }
        })
        wx.stopBluetoothDevicesDiscovery({
            success: function (res) {

            }
        })
    },

    formSubmit: function (e) {
        var senddata = e.detail.value.senddata;
        var that = this;
        let buffer = new ArrayBuffer(senddata.length);
        let dataView = new DataView(buffer);

        //写入通道指令 
        for (var i = 0; i < senddata.length; i++) {
            dataView.setUint8(i, senddata.charAt(i).charCodeAt())
        }

        //数据转码之后
        var dataResult = [];
        for (var i = 0; i < dataView.byteLength; i++) {
            dataResult.push("0x" + dataView.getUint8(i).toString(16));
        }
        console.log("数据转码之后", dataResult);

        wx.writeBLECharacteristicValue({
            deviceId: that.data.connectedDeviceId,
            serviceId: serviceId,
            characteristicId: characteristicId,
            value: buffer,
            success: function (res) {
                wx.showToast({
                    title: '发送成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        });

        // 启用 notify 功能  
        wx.notifyBLECharacteristicValueChanged({
            state: true,
            deviceId: that.data.connectedDeviceId,
            serviceId: serviceId,
            characteristicId: characteristicId,
            success: function (res) {
                console.log("notify启动成功", res);
            }
        });
    },

    receiveMessages: function () {
        var that = this;
        wx.readBLECharacteristicValue({
            deviceId: that.data.connectedDeviceId,
            serviceId: serviceId,
            characteristicId: characteristicId,
            success: function (res) {
            }
        })
    },

})  