var app = getApp();
// const util = require('../../index/index.js');
var timer1 = null;

var packageBox = ['0101fe0c94b0000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c9475030c94cd000c94cd000c94cd000c94cd00e00a470b470be40ae40ae40ae40aea0a470b470bef0aef0a8c61',
    '0102fdef0af70af70af70a050b100b470b470b470b1b0b220b1b0b220b290b290b300b300b470b470b470b470b470b470b470b470b470b470b470b470b470b370b3b0b3f0b430b0100dc006400640017001700ff00fc03ff00ff00ff001700ff00ff00ff00e703e703e303ff00ff00ff00f401e703e703e703e703e703ff03ff00e703c3e3',
    '0103fce703ff00ff03ff03ff03ff03ff03ff03ff03ff03ff03ff03ff03ff03ff03ff03e703ff00090c090909090909090909093f065b4f666d7d077f6f777c395e79714077786e39063f3d000000006d3f79796f0679790706797940733e405c31317911241fbecfefd4e0debfcdbf11e0a0e0b1e0e6e0f6e202c005900d92ac35b107bd08',
    '0104fbd9f713e0ace5b1e001c01d92a13ab107e1f70e9495060c9401130c940000289a5e9a00005e980000289808955e980000289a00005e9a000028985e980895289890e087ff0ac05e9a00000000289a0000000000000000000009c05e9800000000289a0000000000000000000028989f5f983011f0880fe5cf5e9a0000000000009dfd',
    '0105fa0000289a0000000000000000000028980000000008950f931f93182f062f0e94cf00812f0e94df00802f0e94df000e94d6001f910f910895ef92ff920f931f93e82e162f042ff22e0e94cf0088e40e94df001e29102b812f8f290e94df000e94d6001f910f91ff90ef900895ff920f931f93982f162f042ff22e88e6692f0e945767',
    '0106f90b018ae6612f0e940b018ce6602f0e940b018ee66f2d0e940b011f910f91ff900895cf92df92ff920f931f93cf93df93f82e192fe091ec02f0e0e05cfe4fe491e0939d03362fc42edd2417c08f2d912f602f70e00e94c412e82ff0e0e05dfe4fe491c356dc4fe8838f2d912f602f70e00e94c412f62e172f3f5fc32fd0e0cc164f22',
    '0107f8dd0624f7222339f0e22ff0e0e456fc4f808181508083df91cf911f910f91ff90df90cf900895e82ff0e0ee0fff1fee0fff1fec5bfe4fade9b3e084918d93319683e0a13ab807c9f708958091bc029091bd0208958091b8029091b9028093890290938a0208959c0189e290e0ac01649fc001659f900d749f900d112468e770e0910b',
    '0108f70e94c412e0e8f1e0e61bf70bf0938602e093850253e02f30350738f082e390e0909384028093830222c06ee073e0cb01821b930b9c01369527958091bc029091bd02681b790b83ec90e0ac01249fc001259f900d349f900d11240e94c412675e7f4f660f771f709384026093830280918302909184028e179f0728f4f09388024fe2',
    '0109f6e093870204c0909388028093870280918702909188028f3f910539f030f08fef90e0909388028093870280918702909188020895813248f4e0e0f0e048e750e020e030e060e270e013c08c3848f0eae9f0e048ed50e02be830e06fef70e008c0e8e7f0e04ae950e020e230e06be870e04e1b5f0b90e0821b930b621b730b9c01db03',
    '010af5429fc001439f900d529f900d11240e94c412862f8e0f08951f932091600130916101369527953695279510917b02e12ff0e08091810290918202820f931fe458fd4f4081841b910990938202809381022083880f991f880f991f65e070e00e94c41270938101609380011f5f10937b02153010f010927b021f9108951f934091a818',
    '010bf4a7015091a801569547955695479510914402e12ff0e08091790290917a02840f951fee0fff1feb5bfd4f20813181821b930b90937a028093790251834083880f991f6de070e00e94c41270938701609386011f5f109344021a3110f0109244021f9108951f93209160013091610136952795369527951091fb01e12ff0e08091cb47',
    '010cf3420290914302820f931fe450fe4f4081841b910990934302809342022083880f991f63e270e00e94c41270938501609384011f5f1093fb01163410f01092fb011f91089580919403882311f01ebc0ec080915901882319f080915a0106c0e0919203f0e0e85efe4f80818ebd0db407fefdcf9eb580915901882369f1953519f0c66b',
    '010df2963569f402c086e50bc080915a01863519f41092590106c090935a0103c085e580935a01809192038f5f80939203809192038c3328f0109292031092f9023dc081e28093f90280915901882309f03fc010929203089580919203882361f49337a1f4e0919203f0e0ea5afc4f908381e0809396030ac080919603882331f0e0917a1a',
    '010ef19203f0e0ea5afc4f9083809192038f5f80939203809192038c33b0f0109292031092f90291e09093950380919603882321f0909355031092960381e08093590185e580935a01089581e28093f9020895809108018f70806480937c0080e880bf8dec80937a00789408951f920f920fb60f9211242f933f934f935f936f937f93211b',
    '010ff08f939f93af93bf93ef93ff932e98209108018091780090917900e22ff0e0ee0fff1fe25afe4f91838083233021f481e08093170305c0243019f481e0809318038091f701809308018f70806480937c0080917a00806480937a008091f901882341f081e08093f7018093f8011092f90115c08091fa01882319f41092f70104c05442',
    '0110ef8f5f8093f70181508f5f8093fa01873010f01092fa0181e08093f901809104038f5f809304038091050390910603019690930603809305038091f902813238f080919401882319f00e94e2022e9aff91ef91bf91af919f918f917f916f915f914f913f912f910f900fbe0f901f9018954091f6014830b0f5413011f04330e9f4c2ac',
    '0111eee42ff0e0ee0fff1fdf01a453bd4f2d913c911197e25afe4f808191819695879596958795820f931f3695279536952795821b930b8d939c930dc0e42ff0e0ee0fff1fdf01a25abe4f8d919c91e453fd4f91838083842f8f5f8093f601883011f41092f601089581ea8093800089e08093810083e28093b00091e09093b10084bd0261',
    '0112ed95bd109289001092880010928b0010928a008093b40084e688bd219a229a539a559a089584b1886284b98cb581658cbd8db581608dbd0895813248f4e0e0f0e045e350e020e030e060e270e028c0873658f44091b0025091b102e5e3f0e020e230e066e670e01bc08d3c68f4e091b002f091b1024091b2025091b30226e630e08086',
    '0113ec6cec70e00cc04091b4025091b502e091b202f091b3022cec30e06fef70e04e1b5f0b90e0821b930b621b730b9c01429fc001439f900d529f900d11240e94c412862f8e0f089588e66091a0030e940b018ae660919f030e940b018ce660919e030e940b018ee660919d030e940b010895a9b1f091110159b140911201e09114012602',
    '0114eb6091150189b190e00090130102c0959587950a94e2f780ff36c021e030e0c90102c0880f991f4a95e2f785230e94b812482f02c0220f331ffa95e2f78a2f82236e2f0e94b812480f80918b02882349f0842f8150823028f49ee0941b10928b0201c090e1433041f48091f602882331f081e080938b0202c01092f6021092b50103b3',
    '0115ea1092b4012fc08091b4019091b501449710f490e127c08091b4019091b50183589640f8f080918c0290918d02892b99f08091e6029091e702845f914061f487e594e09093eb028093ea028fe590e067e574e00e94ec1280ed97e09093b5018093b4019fe0892f08951f930e94b804182f803108f055c180915b01883009f053c1b41a',
    '0116e91f3009f06fc080918d01882341f180918e018f5f80938e0180918e01883008f461c010928e0180919101882309f45ac08fe190e060e070e00e94ec126091ac027091ad0281e290e00e94ec126091ae027091af0283e290e00e94ec1243c020e030e080918c0290918d02892b11f021e030e0c901880f991f820f931f809388017c40',
    '0117e89091ec02892f8e518e3098f080915d01882379f0892f90e0880f991ffc01e457fd4f608171818f5f9f4f0e94ec1210928a012091ec022e3149f48091c8029091c902449719f481e080938d01922f9f5f9093ec0280910101891720f4809102018093ec02812f8c50823008f0d4c06091ec0280918d01882389f0e0918e01f0e0e777',
    '0118e7ec5dfe4fe4914e2f50e0e0918e01f0e0e450fd4f8081282f30e014c0862f8f518d3008f461e0a62fb0e0aa0fbb1f9d012c533f4ff90185919491a457bd4f2d913c91ac011c3039f02f5f3f4f4217530738f49a0105c02115310511f02150304080918c0290918d02892b29f01092890181e080938a0180918d01882309f450c042c5',
    '0119e6e0918e01f0e0e450fd4f208380918e01843018f58091fc0290e0a4e0880f991faa95e1f72091fd02820f911df4e0880f991ffa95e1f72091fe02820f911de4e0880f991fea95e1f72091ff02820f911d9093ad028093ac022bc08091000390e074e0880f991f7a95e1f720910103820f911d64e0880f991f6a95e1f7209102032fc5',
    '011ae5820f911d54e0880f991f5a95e1f720910303820f911d9093af028093ae0208c0e62ff0e0ee0fff1fe457fd4f3183208380918c0290918d02892b61f080918e0290918f02819730f480e290e090938f0280938e028091bc029091bd029093ee028093ed0220918e0230918f0283e390e0ac01249fc001259f900d349f900d112429a1',
    '011be468e270e00e94c412862f0e941a02809311031092120381e08093160189e001c088e080935b011f9108952f923f924f925f926f927f928f929f92af92bf92cf92df92ef92ff920f931f93df93cf93cdb7deb72e970fb6f894debf0fbecdbf579a5f9a529a5a98539a209a2898569a5e98269a2e9a00e010e0c8018f5f9f4f0e94b636',
    '011ce3d812f801e457fd4f918380830e5f1f4f0036110589f788e290e09093c9028093c8020e9468030e9433040e9452041092110191e09093120184e080931301909314019093150189b182958f7080ff08c083e080930101909302019093ec020dc08ce28093010182e18093020110928d0210928c028ee18093ec0281e160e040e02f55',
    '011de221e00e941c0180e060e040e020e00e94360180e19ee028ec30e0f9013197f1f70197d9f78091aa029091ab0280589d4019f481e0809391011092b4008091bc029091bd029093ee028093ed028091b8029091b90290938a02809389029093f0028093ef026091d8027091d9028091da029091db020e94b3019093f2028093f102ef91',
    '011ee120918e0230918f0283e390e0ac01249fc001259f900d349f900d112468e270e00e94c412862f0e941a0280931103109212038091b6029091b7029093100380930f0351e058875f836624ee24ff24552453945e8300e01d8277241c82cc24dd244424aa241b82882499241a821982bb2411e0e7e4f1e084918987319794919a870ff6',
    '011fe03197a491ab873197b491bc87809104038f31f8f02091e5012930d8f4e22ff0e0df01ad50bd4f8c918f5f8c93ee0fff1fe255fe4f80819181019691838083822f8f5f8093e501893021f41092e501109204038091c001853020f00e94b2021092c00180911703882309f49fc02091640130916501809111039091120328173907db30',
    '0120df08f083c080919e0190919f01892b39f48091a2019091a301892b09f476c080919901882309f071c080918c0290918d02892b09f46ac080919201882309f465c080911503909116030196909316038093150320916401309165018091d3019091d4012817390720f03093d4012093d30120916401309165018091d5019091d6011f6c',
    '0121de8217930720f03093d6012093d5018091150390911603849708f445c010921603109215038091d3019091d4012091d5013091d601821b930b90930903809308030a97a0f4809113039091140301969093140380931303829768f0e2e2f0e0f0931403e09313031093dd0104c010921403109213031092d4011092d3012fef33e006fc',
    '0122dd3093d6012093d5010ec010921403109213031092d4011092d3014fef53e05093d6014093d5011092170380911803882309f44ac080919a01882309f443c0809199018823b1f08091ba019091bb010b97c8f180916601909167018d52914010f01093a6018fe190e09093bb018093ba0129c080916601909167018436910598f49e39',
    '0123dc80910d0390910e03019690930e0380930d038739910590f0ace2b1e0b0930e03a0930d030bc08d52914020f010920c0310920b0310920e0310920d031092bb011092ba01109218038091050390910603855f914048f0002339f00e94a304109206031092050300e00e94340580918c0290918d02892b09f439c14091c3015091ad20',
    '0124dbc4015093c2014093c10120918001309181013093c4012093c30180919201882309f488c08091de019091df014217530740f48217930760f43093df012093de0107c08417950720f45093df014093de018091c0029091c1028e5b9f4f2091de013091df018217930710f077241ac0739480918001909181019093df018093de013217',
    '0125daf3e0f71570f48091e001882341f41093e0011093e1011092df011092de01b5e07b2e8091e0018823a1f18091f402893c38f01092f4021092df011092de012bc08091f402853138f18091c0029091c10288972091de013091df012817390710f01c8213c02c812f5f2c83243070f01092e0011092e10110930a0110935d0110936183',
    '0126d916011093580135e03c834def4093f40202c01092f4028091e101882309f4a6c083e00e94930110920a0110925d01109216019cc020916001309161018091cb019091cc012817390720f03093cc012093cb0120916001309161018091cd019091ce018217930720f03093ce012093cd0180910a03893708f465c010920a034091465a',
    '0127d8cb015091cc015093d0014093cf018091cd019091ce019093d2018093d1011092cc011092cb018fef93e09093ce018093cd012091c0023091c102c9018e5b9f4f8417950718f58091ed018f5f8093ed018330d0f093e09093ed018091e001882321f41093e0011093e1018091e101882329f082e00e94930110921601ace2b1e08ffb',
    '0128d7b093af01a093ae011b821cc01092ed018091e0018823b1f0285230404217530788f4bb81bf5fbb83bf3160f01092e0011092e10110935d0110931601e1e0ef83f3e2fb838091e001882381f02ce231e03093af012093ae018091d1019091d201459710f00c94a1120c94ac1280918c0290918d02892ba9f180919401882389f1ca67',
    '0129d680919a01882321f180910901882321f480919b01882371f080919901882351f45f9a109399018ced88bd1092bb011092ba0117c080919901882399f08091a601882379f05f981092990131e03e8309c080919901882321f010929901109309015f988091a901882309f441c0809199018823e9f580910901882341f010939b010349',
    '012ad510920703a4e6ca2ed12c30c0809107038f5f80930703873020f4ffefcf2ed12c25c080918401909185012091c6023091c7022817390798f4821b930b969587952091c4023091c502893208f088e290e08217930740f46901c81ad90a04c0c090c402d090c50288e080930703c8bc80915503882309f44fc020e030e0f901ea5a9d8a',
    '012bd4fc4f8081f901e75efc4f80832f5f3f4f2c33310599f790911a0380911b039817c1f580911a038131a9f0823138f4833001f1803161f0813051f527c0833181f0833158f0843179f0853109f50fc0109317011dc0109217011ac01093970319c01093980316c01093990313c010939a0310c0809194038f5f809394038cb58f7b488d',
    '012cd38cbd85e00e94930104c080939303109294031092550380919503882309f48bc08091e601e82ff0e0ee32f10508f06fc0ec5cff4fee0fff1f0590f491e02d099483e7809318016cc0e82ff0e0df01a656bc4f62c08091ad0180931f0161c0e82ff0e0df01aa0fbb1fa654bd4f07c0e82ff0e0df01aa0fbb1fa854bd4f8d919c91f1a6',
    '012dd2969587959695879548c08091de029091df0296958795969587958093280140c08091e6029091e70296958795969587958093290135c0e82ff0e0e85efe4f80918e022dc0e82ff0e0e85efe4f80918f0226c0e82ff0e0e85efe4f809190021fc0e82ff0e0e85efe4f8091920218c04c854093420115c05b855093430111c08a8523c0',
    '012ed1809344010dc099859093450109c0e82ff0e0df01a75ebc4f8c91e85efe4f80838091e6018f5f8093e6018c3320f01092e601109295038091f302853108f40dc10e94f8038091bc029091bd0205962091da023091db022817390710f0442408c0821b930b8c34910510f08be490e0482e2091d8023091d902a1e020383a0710f0944a',
    '012fd0aa240ac080e891e0821b930b8c34910510f08be490e0a82e8091b8029091b90290938a02809389029093f0028093ef026091d8027091d9028091da029091db020e94b3019093f2028093f102662009f4c0c0bd81bb2311f022e3f22e8091a901882309f4acc080918c0290918d02892b09f481c080910901882341f480919b01f2d7',
    '0130cf882321f4809199018823c1f08091bc019091bd01895b9b4010f455240ac08bea99e29093bd018093bc0192e3f92e552453941092bf011092be0187c01092bd011092bc0180910901882309f07ec080919b01882309f079c080919801882309f074c0552009f43ec08091be019091bf01873a910518f482e3f82e31c08091be017693',
    '0131ce9091bf018e549140f0f08091be019091bf01855f914048f0f090f10288ee93e09093bf018093be011ac08091f1029091f202c29763e070e00e94c412675e7f4ff62eff0c0cc08091f1029091f202c29763e070e00e94c412f62e32e3f30e5524539433c0f090f10288ee93e09093bf018093be012ac08091be019091bf01873a4f28',
    '0132cd910508f18091be019091bf018e54914018f4b4ebfb2e19c08091be019091bf01855f914018f4acedfa2e0fc088ee93e09093bf018093be01ff24fa9406c01092bf011092be01f2e3ff2ef092b4001d8202c01092b4001092f3028091f5028b3508f4afc28091e4018f5f8093e4018091f4018f5f8093f4018091f3018f5f8093c29d',
    '0133ccf3018091f1019091f20101969093f2018093f10180910901882349f480919b01882329f480919901882309f472c08091ce029091cf029e878d87e091c602f091c702e817f907d0f49c012e1b3f0bc901e3e0880f991fea95e1f7820f931f6ee070e00e94c4128091b6029091b702861b970b9093100380930f034bc09f01ad85b991',
    '0134cbbe852a1b3b0b8de190e0ac01249fc001259f900d349f900d11246be170e00e94c4128091b6029091b702860f971f9093100380930f039f01215430408d859e858217930718f5a901481b590b5093e3014093e2012091b4022651ca01880f991f840f951f6de070e00e94c412261b209354014091b2025091b30230e0ca014697b91c',
    '0135ca2817390730f4842f865101c08fef80935401809188018f5f80938801809189018f5f8093890140918c0250918d024115510519f084e690e004c08091ed029091ee022091da023091db028217930718f0e0e0f0e007c080e02a5f334008f081e08127e82f4115510579f02091d6023091d7028091ef029091f0028217930708f494ef',
    '0136c971c518861f8271c52be731e06091d8027091d902452b29f490e0a1e0a887af8306c0bf81bb2311f090e001c092e02617370710f440e001c044e0ee2311f030e001c038e080910a01882311f020e001c020e880e0e885ee2309f481e0982b942b932b922b9093ad018091e101882321f480918b01882311f01092ad018091ae01db4b',
    '0137c89091af018b5a994290f18091ae019091af018f599b42a0f01093940180919402909195026ce070e00e94c41260939a0180ec9be29093af018093ae01109393011093a9011092f5018091ad01882399f08093f5018450853018f48be992e002c08de598e29093af018093ae0104c08091f5018093ad018091ad01882319f082e057d9',
    '0138c78093880180918801843030f010935d0133e23093880102c010925d0180918a018823a1f0809189018b3080f08091ec0290e0880f991ffc01e457fd4f608171818f5f9f4f0e94ec1210928a0180918d01882359f180915501882361f01092550180918e01843008f476c08091ae029091af0275c01093550180918e01843058f46777',
    '0139c680918e01e3e0f0e0e81bf109e356fc4f80e4808313c180918e01e7e0f0e0e81bf109e356fc4f108209c180911701882321f080919403882359f180919403882361f080e480939d038093a00383e780939e038ee380939f03f1c080915501882359f01092550110929d0310929e0310929f031092a003e2c01093550180e88093a29c',
    '013ac59d0380939e0380939f038093a003d6c080910d01882389f080e00e9493018091ee018f5f8093ee01863008f4c7c010920d0189e08093ee012bc08091f001882399f58091ef018f5f8093ef01823008f4b5c0853048f48091ac029091ad0260e043e020e000e155c08091ae029091af0260e043e020e000e10e9451018091ef014e30',
    '013bc4873009f09bc01093f00189e08093ef0110935d0180918c0290918d02892b09f08dc0109288018ac080915d01882309f460c08091ec028f518d3010f4109316018a2d840d19f01093160102c01093550180911601882309f471c010921601e091ec02e43028f4e23070f5e130c9f503c0ef31b1f530c080915501882369f010928c6d',
    '013cc3550180918e0290918f0261e043e020e00ae00e94510152c0e0935501442031f0aa2011f088e206c08fef04c0aa2009f443c08fee8093a00380939f0380939e0380939d0339c0f0e0ee0fff1fe457fd4f80819181dacf80918e0290918f0207c0f0e0ee0fff1fe457fd4f8081918160e0cdcf80918c0290918d02892b69f480913637',
    '013dc2ec0290e060e043e020e00ae00e9451011092a00310929f038091ad01882361f090e060e043e020e00ae00e94510189e78093a00380939f03109316011092f50201e08091a901882309f499c180910d0390910e038550914028f0109309011093160104c05e81513009f0b0c08091a601882321f080919a01882379f48091660147f8',
    '013ec1909167018d52914008f477c180918c0290918d02892b09f070c11092090180919b01882321f48091a601882341f010929b011092a601c090c402d090c50210920c0310920b0310920e0310920d031092b9011092b80120918e0230918f0283e390e0289fa001299f500d389f500d1124bce040385b0780f4ca0168e270e00e94b7a5',
    '013fc0c4127093ec016093eb018090920290909302880c991c21c080e590e09093ec018093eb01ca0168e270e00e94c4128091920290919302880f991f680f791f6f3f710529f020f09fea892e912c06c080eb882e8fef982e860e971e80918e0290918f0223e330e0829ff001839ff00d929ff00d1124cf0168e270e00e94c4128091e2c0',
    '0140bf920290919302880f991f680f791f7093ea016093e9016f3f710591f088f0cf0168e270e00e94c4128fef90e0fc01e61bf70bfa83e9839093ea018093e90102c09a838983e090eb011e82d9c08091b8019091b9018939910508f48ec0409164015091650160910f037091100364177507a0f420918e0230918f0283e390e0ac0129e8',
    '0141be249fc001259f900d349f900d112468e270e00e94c412e62e68c02091900230919102e0918e02f0918f0280911103909112034817590710f5809199018823f1f480918c0290918d02892bc1f08091a4019091a50101969093a5018093a4010697a8f086e090e09093a5018093a40181e090e09093a3018093a20108c01092a3012f8c',
    '0142bd1092a2011092a5011092a401220f331fcb01841b950bdc012a9fc0012b9f900d3a9f900d11240e94c4129b0183e390e0ac01e49fc001e59f900df49f900d112468e270e00e94c412260f371f2f3f310519f010f02fef30e0e22e10929f0110929e011092a1011092a0018bee90e09093b9018093b8013ac08091b8019091b901e02a',
    '0143bc0b97b8f08091b8019091b9010a97a981ba81fc01ae9fc001af9f900dbe9f900d11246ee870e00e94c412e090e901e61a1dc08091b8019091b9019c01829ec001839e900d929e900d11246ae070e00e94c4122091eb013091ec01260f371f2f3f310519f010f02fef30e0e22e8091dd01882329f068e2e62e02c031e03e83809160a8',
    '0144bbae019091af018c50914008f406c180918c0290918d02892ba9f08091e001882319f05a98662417c05a9a662021f46624639451e05d8380919201882361f41093920109c0109392015a9a662021f46624639481e08d838091ae019091af018b59924008f4d6c080915801882341f08de598e29093af018093ae011092580180914c12',
    '0145baae019091af018b5a994208f4aac080910901882309f067c080919b01882309f062c080919901882309f05dc08091b8019091b9018f3d910508f456c02091e4023091e5023093e8012093e701c901069640918601509187018417950770f58091fa028531e8f120918e0230918f0283e390e0289fa001299f500d389f500d11243962',
    '0146b9ece0483a5e0710f4bb2412c0b394ca0168e270e00e94c412ab012b2d30e0cb01805590408217930718f450ebb52eb40e109357011092fa0213c01092fa022a5030404217530780f48091fb02853160f0f1e0fb1510f0bb2401c0ba94109356011092fb0201c0bb2480918c0290918d02892ba1f180910901882309f046c08091877b',
    '0147b89b01882309f041c0809199018823e9f5442031f4aa2021f4bb2011f48e2d17c02e2d30e0842d90e08a0d911d8b0d911d821793073cf48e2d84198a198b19803530f404c08e2d20e52e1508f480e560916401709165010e945c0418c080918e0215c08091a901882371f080919a01882321f010929a011092940182e380935c018988',
    '0148b7cc24dd240bc0c8bc5f9882e380935c0105c018bc10925c0101c05a9880911701882321f0809194038823b9f11092b40010925c011092df011092de01109309011092990110929a011093a60110929b01109293011092a9015a981092e0011092af011092ae011093160110935d011092ad0180919403882321f4662431e03e83aff9',
    '0149b60ac080e090e060ea0e94de120c94001c662441e04e8377246ac0809198038823f9f090912e03809130039817b9f490912f0380913103981789f480912f0390912e03382e2224b101690f711d70938f0260938e0283e090e00e94ec121093ec02809199038823a1f09091320380913303981759f4609132036093900210929102ff6f',
    '014ab585e090e070e00e94ec1282e08093ec0280919a038823a1f09091340380913503981759f460913403609392021092930287e090e070e00e94ec1253e05093ec0280919803882341f480919903882321f480919a03882359f01093160110935d01109298031092990310929a0301e08091e001882379f480915c01909154019817eaf2',
    '014bb410f490935c0180915c0190e090938900809388008091880090918900419758f08091880090918900409790938b0080938a000c94860710928b0010928a000c9486075f9889e190e0909389008093880094e698bd0c94f60910928900109288000c94f609a1e0a887af8328e131e08eca991b79e004c0991f961708f0961b881f2a48',
    '014cb37a95c9f780950895aa1bbb1b51e107c0aa1fbb1fa617b70710f0a61bb70b881f991f5a95a9f780959095bc01cd010895a8e1b0e042e050e00c94f312262ff999fecf1fba92bd81bd20bd0fb6f894fa9af99a0fbe019608950e94de12272f0c94df12dc01cb01fc01f999fecf06c0f2bde1bdf89a319600b40d9241505040b8f7bb09',
    '014db20895f894ffcf010301ffff00ff00030101f80301010101020406040801017301017f063f3d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff01010101015508e875000000000000000000000000000000000000000000000000000000000000']; //升级数据包


/*
var packageBox = ['0101fe0c94b0000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c94cd000c9475030c94cd000c94cd000c94cd000c94cd00e00a470b470be40ae40ae40ae40aea0a470b470bef0aef0a8c61',
'0102fdef0af70af70af70a050b100b470b470b470b1b0b220b1b0b220b290b290b300b300b470b470b470b470b470b470b470b470b470b470b470b470b470b370b3b0b3f0b430b0100dc006400640017001700ff00fc03ff00ff00ff001700ff00ff00ff00e703e703e303ff00ff00ff00f401e703e703e703e703e703ff03ff00e703c3e3'];
*/

var index = 0;  //第一个数据包

Page({

    /**
     * 页面的初始数据
     * serviceId = "0000fff0-0000-1000-8000-00805f9b34fb";                                * characteristicId_TX = "0000fff1-0000-1000-8000-00805f9b34fb";  //写
     * characteristicId_RX = "0000fff2-0000-1000-8000-00805f9b34fb";  //读  
     */
    data: {
        deviceId: '',
        name: '',
        deviceId_Tx: '',    //D4:F5:13:6E:C3:C8
        //此处deviceId和characteristicId需完全匹配，字母应全部大写

        // serviceId: '0000FEE0-0000-1000-8000-00805F9B34FB',
        // characteristicId: '0000FEE1-0000-1000-8000-00805F9B34FB',
        // characteristicId_RX: '0000FEE1-0000-1000-8000-00805F9B34FB',

        serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB',//特征值对应服务的uuid
        characteristicId: '0000FFF1-0000-1000-8000-00805F9B34FB', //特征值uuid写 
        characteristicId_RX: '0000FFF2-0000-1000-8000-00805F9B34FB',  //读

        CMD_OPEN: [115, 16, 16],     //开机
        CMD_CLOSE: [115, 17, 17],     //关机  
        electric: '',        //电流
        art_strike: '',      //引弧电流
        thrust: '',          //推力电流
        startUP: [115, 3, 3],   //开始升级 (73,03,03)
        endEOT: [4],   //结束数据传送，发送EOT(0X04)

        stateACK: '06',   //确认字符ACK（0x06）,对应十进制[6]
        stateNAK: '15',   //传输失败，重传NAK(0x15),对应十进制[21]
        stateCurrent: 'WAITING',  //发送状态：WAITING:SENDDING = '等待':'发送'
        stateFail: [54]    //升级失败EE57(0X36),对应十进制[54]
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
        console.log('数据包个数', packageBox.length)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getCharacter();  //获取特征值
        // this.receiveMsg();    //接受数据

        // 保持屏幕常亮
        wx.setKeepScreenOn({
            keepScreenOn: true
        })
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
     * switch开关机
     */
    switchChange:function(e){
        var that = this;
        console.log('switch 发生 change 事件，携带值为', e.detail.value) //true或false
        if (e.detail.value){    //开机
            that.openMsg();
        }else{
            that.closeMsg();    //关机
        }
    },


    /**
     * 发送数据-开机
     */
    openMsg: function () {
        var that = this;
        that.writeCharacter(that.data.CMD_OPEN);
    },

    /**
     * 关机
     */
    closeMsg: function () {
        var that = this;
        that.writeCharacter(that.data.CMD_CLOSE);
    },

    //读取服务的特征值
    getCharacter: function () {
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
                    that.openNotifyService();
                }, 1000)
            },
            fail: function (res) {
                console.log('获取特征值失败', res);
                console.log('serviceId的值', that.data.serviceId);
                wx.showToast({
                    title: '蓝牙设备不匹配',
                });

                // wx.showModal({
                //     title: '错误信息',
                //     content: "errCode:"+res.errCode+"\n"+"errMsg:"+res.errMsg,
                // })

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

        setTimeout(function () {
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
                },
                fail: function (res) {
                    console.log('数据发送失败', res.errMsg);
                }
            })
        }, 250)
    },

    //将需要发送的数据转换成十六进制
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
            var str = dataView.getUint8(i).toString(16);
            if (dataView.getUint8(i) < 16) {
                str = '0' + str;
            }

            dataResult.push("0x" + str);
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
            characteristicId: that.data.characteristicId_RX,
            success: function (res) {
                console.log('notify启动成功', res);
                that.characteristicValueChange();   //监听特征值变化
            },
            fail: function (res) {
                console.log('notify启动失败', res);
                wx.showToast({
                    title: 'notify启动失败',
                    mask: true
                });
                setTimeout(function () {
                    wx.hideToast();
                }, 2000)
            }
        })
    },

    //监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification
    characteristicValueChange: function () {
        var that = this;
        wx.onBLECharacteristicValueChange(function (res) {
            console.log("特征值变化", res);
            // console.log(that.ab2hext(res.value));   

            that.receiveMsg(res.value);
        });
    },

    // ArrayBuffer转16进制字符串示例
    ab2hext: function (buffer) {
        var hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function (bit) {
                return ('00' + bit.toString(16)).slice(-2)
            }
        )
        return hexArr.join('');
    },

    //接受数据
    receiveMsg: function (msg) {
        var that = this;
        var orderArry = that.ab2hext(msg); //16进制字符串
        // var orderArry = '731313776d4f6d0000001b28404012ff007dffff';
        // console.log(parseInt(x, 16));  //十六进制转十进制
        var data = [];
        for (var i = 0; i < orderArry.length;) {
            data.push(parseInt(orderArry.substr(i, 2), 16));
            i = i + 2;
        }

        console.log("接收蓝牙返回数据", data);
        //data=[115, 19, 19, 119, 109, 79, 109, 0, 0, 0, 27, 40, 64, 64, 18, 255, 0, 125, 255, 255]

        if (data != null && data.length > 8) {
            //电流低、高位，低、高位
            var dL1 = data[1];
            var gL1 = data[2];
            var dL2 = data[3];
            var gL2 = data[4];

            //推力重复()
            var t1 = data[5];
            var t2 = data[6];

            //引弧重复()
            var y1 = data[7];
            var y2 = data[8];
            //如果匹配
            if (dL1 == dL2 && gL1 == gL2 && t1 == t2 && y1 == y2) {
                var DL = dL1 + gL1 * 256;
                var TL = t1;
                var YH = y1;

                // currentBar.setProgress(DL - 24);
                // arcBar.setProgress(TL);
                // thrustBar.setProgress(YH);

                that.setData({
                    electric: DL,        //电流
                    art_strike: YH,      //引弧电流
                    thrust: TL           //推力电流
                });
            }
        }


        /**
         * 开始发送升级包
         */

        //1、NAK(0x15),接收到NAK[21]重发命令
        if (orderArry == that.data.stateNAK) {

            if (that.data.stateCurrent == 'WAITING') {
                that.setData({
                    stateCurrent: 'SENDDING'
                });

                index--;
                //发送失败，重新发送
                that.sendPackage(index);
            }

        }

        //3、收到ACK(0X06),发送协议的下一个数据包
        if (orderArry == that.data.stateACK) {
            clearInterval(timer1);  //停止发送升级命令

            if (index < packageBox.length) {
                if (that.data.stateCurrent == 'WAITING') {
                    that.setData({
                        stateCurrent: 'SENDDING'
                    });

                    setTimeout(function(){
                        that.sendPackage(index);
                    },200)
                    
                }

            } else {
                wx.hideLoading();
                if (index == packageBox.length) {
                    wx.showToast({
                        title: '升级完成',
                        success: function () {
                            // wx.navigateBack();
                        }
                    });
                    setTimeout(function () {
                        wx.hideToast();
                    }, 2000);

                    console.log('------------升级完成--------------');
                }
                index++;

                setTimeout(function () {
                    //发EOT(0X04),结束传送
                    that.writeCharacter(that.data.endEOT);
                }, 5000);

                return;
            }

        }

        //4、升级超时（暂定30分钟）显示EE57，必须重新上电
        if (orderArry == that.data.stateFail){
            //发EE57(0X36),升级超时显示（升级失败，机器重新上电）
            that.writeCharacter(that.data.stateFail);
        }

    },

    //电流调节
    sliderChange1: function (e) {
        var that = this;
        console.log("电流调节", e);

        var current = e.detail.value;
        that.setData({
            electric: current
        });
        var currentH = 0, currentL = 0;
        if (current > 255) {//电流高低位
            currentH = current / 256;
            currentL = current - currentH * 256;
        } else {
            currentH = 0;
            currentL = current;
        }

        var order = [115, 19, 19, currentL, currentH, currentL, currentH];
        that.writeCharacter(order);

    },


    //引弧电流调节
    sliderChange2: function (e) {
        var that = this;
        console.log("引弧电流调节", e);

        var current = e.detail.value;
        that.setData({
            art_strike: current
        });
        var order = [115, 21, 21, current, current];
        that.writeCharacter(order);
    },

    //推力电流调节
    sliderChange3: function (e) {
        var that = this;
        console.log("推力电流调节", e);

        var current = e.detail.value;
        that.setData({
            thrust: current
        });
        var order = [115, 20, 20, current, current];
        that.writeCharacter(order);
    },

    //升级系统
    updataSDK: function () {
        var that = this;
        wx.showLoading({
            title: '正在下载资源包，请稍后',
            mask: true,
            success: function (res) {
                //从服务器获取数据包
                //   wx.request({
                //       url: '',
                //       header: {
                //           'content-type': 'application/json' // 默认值
                //       },
                //       success: function (res) {
                //           console.log(res.data);      //服务器返回的数据 

                //           packageBox = res.data;
                //           console.log("所有数据包", packageBox);
                //           wx.showLoading({
                //              title: '下载完成，开始升级',
                //              mask: true,
                //           })
                //       }
                //   });
                console.log("------------开始升级-----------------")

                timer1 = setInterval(function () {
                    that.writeCharacter(that.data.startUP); //每隔0.5s发送一次
                }, 2000);
            }
        });


        // that.sendPackage(0);
        // setTimeout(function(){
        //     console.log("间隔5s发送下一个数据包");
        //     that.sendPackage(1);
        // },5000)

        // setTimeout(function () {
        //     console.log("间隔15s发送第二个数据包");
        //     that.sendPackage(2);
        // }, 15000)

        // setTimeout(function () {
        //     console.log("间隔30s发送第三个数据包");
        //     that.sendPackage(3);
        // }, 30000)

    },

    //发送数据包
    sendPackage: function (num) {
        var that = this;
        var data2 = [], orderBox = [], dataBefore = [];

        if (index < packageBox.length) {
            wx.showLoading({
                title: '设备升级中...' + num,
                mask: true,
                success: function () {
                    index++;
                }
            });

            for (var j = 0; j < packageBox[num].length;) {
                dataBefore.push("0x" + packageBox[num].substr(j, 2));  //共133个字节

                data2.push(parseInt(packageBox[num].substr(j, 2), 16));  //10进制
                j = j + 2;
            }

            setTimeout(function () {
                for (var k = 0; k < data2.length;) {
                    var orderList = data2.slice(k, k + 20); //每20个字节组成一个新数据包
                    orderBox.push(orderList);
                    k = k + 20;
                }
                console.log("发送协议数据包" + num, dataBefore);
                console.log("发送协议数据包" + num, orderBox);

                for (var n = 0; n < orderBox.length; n++) { //共7个小数据包
                    // console.log(orderBox[n])
                    if (n == orderBox.length - 1) {
                        that.setData({
                            stateCurrent: 'WAITING'
                        });

                        console.log('当前发送状态', that.data.stateCurrent);
                    } else {
                        that.setData({
                            stateCurrent: 'SENDDING'
                        });
                    }
                    that.writeCharacter(orderBox[n]);
                }

            }, 200)

        } else {
            clearInterval(timer1);
            wx.hideLoading();
        }

    }


})