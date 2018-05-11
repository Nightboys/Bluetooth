var app = getApp();

Page({

    /**
     * 页面的初始数据
     * 
     * serviceId = "0000fff0-0000-1000-8000-00805f9b34fb";                             * characteristicId_TX = "0000fff1-0000-1000-8000-00805f9b34fb";
     * characteristicId_RX = "0000fff2-0000-1000-8000-00805f9b34fb";
     */
    data: {
        BluetoothList: [{ 'name': 'liu', 'deviceId': '123' }],    //蓝牙设备列表
        flag: false,
        deviceId: '',     //已配对的蓝牙设备id
        name: '', //已配对的蓝牙设备name 
        sendMsg: []     //需要发送的数据

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("系统信息", app.globalData.sysinfo);
        //获取当前设备平台以及微信版本
        if (app.getPlatform() == 'android' && this.versionCompare('6.5.7', app.getVersion())) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，请更新至最新版本',
                showCancel: false
            })
        }
        else if (app.getPlatform() == 'ios' && this.versionCompare('6.5.6', app.getVersion())) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，请更新至最新版本',
                showCancel: false
            })
        }
    },

    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
        this.startConnect();    //页面加载完成后直接开启蓝牙搜索
    },

    /***
     * 微信版本比较
     */
    versionCompare: function (ver1, ver2) {
        var version1pre = parseFloat(ver1)
        var version2pre = parseFloat(ver2)
        var version1next = parseInt(ver1.replace(version1pre + ".", ""))
        var version2next = parseInt(ver2.replace(version2pre + ".", ""))
        if (version1pre > version2pre)
            return true
        else if (version1pre < version2pre)
            return false
        else {
            if (version1next > version2next)
                return true
            else
                return false
        }
    },


    /**注意：
     * 1.安卓 6.0 及以上设备需打开定位服务
     * 2.wx.onBluetoothDeviceFound 不兼容
     *    =>安卓及iOS设备使用 wx.onBluetoothDeviceFound 时会出现不同的返回值，且有概率出现重复设备
     * 
     * 流程：1.先初始化蓝牙适配器，
     * 2.获取本机蓝牙适配器的状态，
     * 3.开始搜索，当停止搜索以后在开始搜索，就会触发蓝牙是配置状态变化的事件，
     * 4.搜索完成以后获取所有已经发现的蓝牙设备，就可以将devices中的设备Array取出来，       * 5.然后就可以得到所有已经连接的设备了
     */

    // 初始化蓝牙适配器
    startConnect: function () {

        var that = this;

        wx.closeBluetoothAdapter({
            success: function (res) {
                that.setData({
                    BluetoothList: []
                });
            }
        });

        setTimeout(function () {
            // 初始化小程序蓝牙模块
            wx.openBluetoothAdapter({

                success: function (res) {

                    console.log("初始化蓝牙适配器", res);

                    that.getBluetoothAdapterState();
                },

                fail: function (err) {

                    console.log(err);

                    that.setData({
                        BluetoothList: []
                    });

                    wx.showToast({

                        title: '请打开蓝牙设备',

                        icon: 'success',

                        duration: 2000

                    })

                    setTimeout(function () {

                        wx.hideToast()

                    }, 2000)

                }

            });

            // 监听蓝牙适配器状态变化事件
            wx.onBluetoothAdapterStateChange(function (res) {
                console.log("当前蓝牙适配器状态", res);

                var available = res.available;
                // 蓝牙适配器是否可用
                if (available) {
                    that.getBluetoothAdapterState();
                } else {
                    that.setData({
                        BluetoothList: []
                    });

                    wx.showToast({

                        title: '请打开蓝牙设备',

                        icon: 'success',

                        duration: 2000

                    })

                    setTimeout(function () {

                        wx.hideToast()

                    }, 2000)
                }

            })
        }, 1000)

    },

    // 获取本机蓝牙适配器状态，判断是否可用
    getBluetoothAdapterState: function () {

        var that = this;

        wx.getBluetoothAdapterState({

            success: function (res) {

                console.log('获取本机蓝牙适配器状态', res);

                var available = res.available,  //蓝牙适配器是否可用

                    discovering = res.discovering;  //是否正在搜索设备

                if (available) {
                    if (!discovering) {
                        that.startBluetoothDevicesDiscovery();// 开始搜寻
                    }
                    // that.startBluetoothDevicesDiscovery();// 开始搜寻
                } else {
                    wx.showToast({
                        title: '设备无法开启蓝牙连接',
                        icon: 'success',
                        duration: 2000
                    })

                    setTimeout(function () {
                        wx.hideToast()
                    }, 2000)
                }

            }

        })

    },

    // 开始搜寻附近的蓝牙外围设备
    startBluetoothDevicesDiscovery: function () {
        var that = this;
        wx.showLoading({
            title: '正在搜索蓝牙设备，请稍后',
            mask: true
        });

        wx.startBluetoothDevicesDiscovery({

            services: [],   //蓝牙设备主 service 的 uuid 列表

            allowDuplicatesKey: false,  //是否允许重复上报同一设备

            success: function (res) {
                console.log('搜寻获取本机蓝牙适配器状态', res);

                if (!res.isDiscovering) {

                    that.getBluetoothAdapterState();    //获取本机蓝牙适配器状态

                } else {
                    that.getBluetoothDevices(); //获取所有已发现的蓝牙设备  
                    that.onBluetoothDeviceFound();  //监听寻找到新设备的事件
                }

            },

            fail: function (err) {

                console.log(err);

            }

        });

        // setTimeout(function(){
        //     that.stopBluetoothDevicesDiscovery();   //配对之前需要停止搜寻附近的蓝牙设备
        // },1000);

    },

    //停止搜寻附近的蓝牙设备
    stopBluetoothDevicesDiscovery: function () {
        var that = this;
        wx.stopBluetoothDevicesDiscovery({
            success: function (res) {
                console.log('停止搜索附近的蓝牙设备', res)
            }
        });
    },

    //获取所有已发现的蓝牙设备  
    getBluetoothDevices: function () {
        var that = this;
        wx.getBluetoothDevices({
            success: function (res) {

                setTimeout(function () {
                    wx.hideLoading();
                }, 2000);

                console.log("获取所有已发现的蓝牙设备", res);

                var list = {};
                var BluetoothList = [];
                // var BluetoothList = that.data.BluetoothList;
                for (var i = 0; i < res.devices.length; i++) {
                    var name = res.devices[i]['name'];  //蓝牙设备名称
                    var deviceId = res.devices[i]['deviceId'];  //设备id
                    list = { 'name': name, 'deviceId': deviceId };
                    BluetoothList.push(list);
                };

                that.setData({
                    BluetoothList: BluetoothList,
                    flag: true
                });
                /*
                 setTimeout(function () {
                     //开始蓝牙配对
                     that.startConnectDevices(that.data.deviceId, that.data.name);
                 }, 5000);
                */
            },
        })
    },

    // 监听寻找到新设备的事件
    onBluetoothDeviceFound: function () {

        var that = this;

        /*wx.onBluetoothDeviceFound(function (res) {

            console.log("寻找到新设备", res);

            if (res.devices[0]) {       //devices新搜索到的设备列表
                var list = {};
                var name = res.devices[0]['name'];  //蓝牙设备名称
                var deviceId = res.devices[0]['deviceId'];  //用于区分设备的 id
                var BluetoothList = that.data.BluetoothList;

                console.log('已存在的设备', BluetoothList);

                if (!BluetoothList.length) {
                    if (name != '') {
                        list = { 'name': name, 'deviceId': deviceId };
                        BluetoothList.push(list);

                        that.setData({
                            BluetoothList: BluetoothList,
                            flag: true
                        });
                    }
                } else {
                    //判断新设备是否已经被搜索过
                    for (var i = 0; i < BluetoothList.length; i++) {
                        if (BluetoothList[i].deviceId != deviceId) {
                            if (name != '') {
                                list = { 'name': name, 'deviceId': deviceId };
                                BluetoothList.push(list);

                                that.setData({
                                    BluetoothList: BluetoothList,
                                    flag: true
                                });
                            }
                        }
                    }
                }
            }

        });*/

        wx.onBluetoothDeviceFound(function (devices) {
            var isnotExist = true;  //不存在
            var foundDevice = that.data.BluetoothList;
            var list = {};

            console.log("寻找到新设备", devices);
            //判断当前设备是否已存在
            if (devices.deviceId) {
                for (var i = 0; i < foundDevice.length; i++) {
                    if (devices.deviceId == foundDevice[i].deviceId) {
                        isnotExist = false; //已存在
                    }
                }
                if (isnotExist && devices.name != '') {
                    list = { 'name': devices.name, 'deviceId': devices.deviceId };
                    foundDevice.push(list);
                }
            }
            else if (devices.devices) {
                for (var i = 0; i < foundDevice.length; i++) {
                    if (devices.devices[0].deviceId == foundDevice[i].deviceId) {
                        isnotExist = false;
                    }
                }
                if (isnotExist && devices.devices[0].name != '') {
                    list = { 'name': devices.devices[0].name, 'deviceId': devices.devices[0].deviceId };
                    foundDevice.push(list);
                }
            }
            else if (devices[0]) {
                for (var i = 0; i < foundDevice.length; i++) {
                    if (devices[0].deviceId == foundDevice[i].deviceId) {
                        isnotExist = false;
                    }
                }
                if (isnotExist && devices[0].name != '') {
                    list = { 'name': devices[0].name, 'deviceId': devices[0].deviceId };
                    foundDevice.push(list);
                }
            }

            that.setData({
                BluetoothList: foundDevice,
                flag: true
            });
        });

    },

    // 开始配对蓝牙设备
    startConnectDevices: function (deviceId, name) {

        var that = this;

        // that.stopBluetoothDevicesDiscovery();   //配对之前需要停止搜寻附近的蓝牙设备
        //开始配对
        wx.createBLEConnection({

            deviceId: deviceId,

            success: function (res) {

                console.log('开始配对', res);

                if (res.errCode == 0) {
                    console.log('配对成功,获取服务', res);
                    that.setData({
                        deviceId: deviceId,
                        name: name
                    });

                    setTimeout(function () {

                        that.getService();  // 获取蓝牙设备服务

                    }, 5000)

                }

            },

            fail: function (err) {

                console.log('连接失败：', err);

                wx.showToast({
                    title: '连接失败,请手动重试',
                    icon: 'success'
                });

            },

        });

        /* wx.onBLEConnectionStateChange(function (res) {
             // 该方法回调中可以用于处理连接意外断开等异常情况
             if (!res.connected) {    //连接目前的状态
                 console.log("连接已断开，正在重新连接");
                 that.startConnectDevices();
             }
         })*/

    },

    //蓝牙配对之前需要先断开当前已配对的设备
    stopConnectDevices: function () {
        var that = this;

        wx.closeBLEConnection({
            deviceId: that.data.deviceId,
            success: function (res) {
                console.log('配对之前先断开已连接设备', res)
            }
        });
    },

    // 获取蓝牙设备服务
    getService: function () {
        var that = this;

        wx.getBLEDeviceServices({
            deviceId: that.data.deviceId,
            success: function (res) {
                console.log('蓝牙设备service(服务)信息:', res);
                console.log('res.services的值', res.services);

                var services = res.services;
                var arr = [];
                services.forEach(function (value, index) {
                    arr.push(value.uuid);
                });
                setTimeout(function () {
                    wx.getConnectedBluetoothDevices({
                        services: arr,
                        success: function (res) {
                            console.log("当前连接的设备", res)
                        }
                    });
                }, 200);

                setTimeout(function (res) {
                    wx.showToast({
                        title: '连接成功',
                        icon: 'success',
                        success: res => {
                            setTimeout(function () {
                                wx.navigateTo({
                                    url: '../detail/detail?name=' + that.data.name + '&deviceId=' + that.data.deviceId,
                                    success: res => {
                                        wx.hideToast();
                                    }
                                });
                                console.log("serviceId列表", arr);

                                // wx.showModal({
                                //     title: 'serviceId列表',
                                //     content: arr.join('\n'),
                                // })

                            }, 2000);

                            // that.getCharacter(that.data.deviceId, services);
                        }
                    });

                }, 500);
            },
            fail: function () {
                wx.showToast({
                    title: '连接失败,请手动重试',
                    icon: 'success'
                });
                setTimeout(function () {
                    wx.hideToast();
                }, 2000);
            }
        });
    },



    //点击连接跳转页面 
    connectBluetooth: function (e) {
        var that = this;
        var obj = e.currentTarget.dataset;

        console.log("点击设备", e);

        that.stopConnectDevices();  //配对之前先断开已连接设备
        wx.showLoading({
            title: '正在连接，请稍后',
            mask: true
        });

        setTimeout(function () {
            that.startConnectDevices(obj.deviceid, obj.name);
        }, 100);
    },


    // ArrayBuffer转16进度字符串示例
    ab2hex: function (buffer) {
        //ArrayBuffer.prototype:通过 ArrayBuffer 的原型对象可以为所有 ArrayBuffer 对象添加属性
        var hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function (bit) {
                return ('00' + bit.toString(16)).slice(-2)
            }
        )
        return hexArr.join('')
    }

})

/*
    module.exports = {
        stopBluetoothDevicesDiscovery: stopBluetoothDevicesDiscovery
    }
*/