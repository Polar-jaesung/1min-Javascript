
(()=>{
    let yOffset=0; // window.pageYoffset 대신 쓰는 변수
    let prevScrollHeight=0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene=0; //현재 활성화된 (눈 앞에 보이는) Scene (scroll-section)
    let enterNewScene= false;  //새로운 scene이 시작되면 true로 바뀜

    const scene=[
    {
    // 0번 인덱스
    type:'sticky',
    scrollHeight:0,
    heightNum:5,
    objs:{
        container:document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d')
    },
    values:{
        messageA_opacity:[0,1]
        }
    },
    {
    // 1번 인덱스
    type:'normal',
    scrollHeight:0,
    heightNum:5,
    objs:{
        container:document.querySelector('#scroll-section-1')
        
        },
   
    },
    {
    // 2번 인덱스  
    type:'sticky',
    scrollHeight:0,
    heightNum:5,
    objs:{
        container:document.querySelector('#scroll-section-2')
        }
    },

    {
    //3번 인덱스 
    type:'sticky',
    scrollHeight:0,
    heightNum:5,
    objs:{
        container:document.querySelector('#scroll-section-3')
         }
    }
    ];

    function setLayout(){
        // 각 스크롤 섹션의 높이 세팅
        for(let i=0; i<scene.length;i++){
            scene[i].scrollHeight= scene[i].heightNum * window.innerHeight;
            scene[i].objs.container.style.height=`${scene[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight =0;
        for (let i=0; i< scene.length; i++){    
            totalScrollHeight += scene[i].scrollHeight;
            if(totalScrollHeight > yOffset){
                currentScene =i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);

    };
    function calcValues (values, currentYoffset){
    // currentYoffset: 현재 scene에서 얼마나 스크롤 되었는지 잡는 변수
        let rv;
        let scrollRatio = currentYoffset / scene[currentScene].scrollHeight;
        // 현재 scene(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        
    

        rv = scrollRatio * (values[1]- values[0])+ values[0];
        return rv;

    }

    function playAnimation(){
        const objs = scene[currentScene].objs;
        const values = scene[currentScene].values;
        const currentYoffset =yOffset-prevScrollHeight;

        console.log(currentScene);
        
        switch(currentScene){
            case 0:
                let messageA_opacity_in =  calcValues(values.messageA_opacity,currentYoffset);
                objs.messageA.style.opacity = messageA_opacity_in;

                
                 console.log( messageA_opacity_in );

                break;
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
        };
    };

    function scrollLoop(){
            enterNewScene =false;
            prevScrollHeight=0;
            for(let i=0; i < currentScene; i++){
            prevScrollHeight += scene[i].scrollHeight;
        }
        
        if(yOffset > prevScrollHeight + scene[currentScene].scrollHeight) {
            enterNewScene =true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight){
            enterNewScene =true;
            if(currentScene===0){
                return;
            }
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if (enterNewScene) return;
        playAnimation();
        
    }

    
    window.addEventListener('scroll',  ()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load',setLayout);//setLayout이 여기서 한번 실행
    window.addEventListener('resize',setLayout); //창 크기 바뀌면 또 한번 실행
    

})();
