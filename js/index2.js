scrollHeader();
stickySection();
dragSection();
makeSlide()



function scrollHeader(){
    const header = document.getElementsByTagName('header')[0];
    
    window.addEventListener('mousewheel', (e)=> {
        if(e.deltaY>0){
        header.classList.add('hide-header')
        }else{
            header.classList.remove('hide-header')
        }
    })
}

function stickySection() {

    const eventText = document.getElementsByClassName('event-text');
const eventImg = document.getElementsByClassName('event-img');

for(let i=0; i< eventText.length; i++){

    window.addEventListener('scroll',()=>{
        // console.log(eventText[1].getBoundingClientRect().top)
        //1000가까이 됐을때 사진 opacity1
        if(eventText[i].getBoundingClientRect().top - window.innerHeight < 0){
            eventImg[i].classList.remove('event-opacity');
        }else{
            if(i!==0){
                eventImg[i].classList.add('event-opacity');
            }
            
        }
        
    })
}
}

// ====

function dragSection() {

    const rect = document.getElementsByClassName('we-believe')[0];

    document.getElementsByClassName('lush-story').ondragstart = ()=>{
        return false;
    }


    rect.addEventListener('mousedown', dragSectionEvent);
    
    window.addEventListener('resize', ()=>{
        rect.style.transform = `translateX(0px)`
        console.log(`translate 값 초기화`)
        rect.removeEventListener('mousedown',dragSectionEvent);
        console.log(`드래그 이벤트 삭제`)
        if(window.innerWidth>1239){
            rect.addEventListener('mousedown', dragSectionEvent);
            console.log(`window.innerWidth = ${window.innerWidth}, 이벤트 재설정!`)
        }
        console.log(`리사이즈 이벤트 종료`)
    })

    function dragSectionEvent(e){
            const rectLocation = rect.getBoundingClientRect();
            const startX = e.clientX
            document.addEventListener('mousemove',dragThings)
            document.addEventListener('mouseup', ()=>{
                document.removeEventListener('mousemove', dragThings)
            })
    
            function dragThings(event) {
                const nowX = event.pageX;
                console.log(`컨테이너 이동거리 : ${rectLocation.x+nowX-startX}\n컨테이너의 Width 크기:${rect.clientWidth}\n브라우저 내부 Width 크기 : ${window.innerWidth}\n컨테이너-브라우저=이동가능거리(${rect.clientWidth-window.innerWidth})`)
                
                if(rectLocation.x+nowX-startX>0){
                    console.log(`왼쪽이동 정지`)
                    rect.style.transform = `translateX(0px)`
                }else if(rectLocation.x+nowX-startX<(rect.clientWidth-window.innerWidth)*-1){
                    rect.style.transform = `translateX(${rect.clientWidth-window.innerWidth})`
                    console.log(`오른쪽 이동 정지`)
                }
                else{
                    rect.style.transform = `translateX(${rectLocation.x+nowX-startX}px)`
                }
            }
        
    }



}



// ====
function makeSlide(){


    const slidWrapper = document.querySelector(`.slid-wrapper`);
    const black = document.getElementsByClassName(`black-container`).length;
    const prevButton = document.querySelector(`.arrow-left`);
    const nextButton = document.querySelector(`.arrow-right`);

    let index = 0;
    // const 슬라이드너비 = window.innerWidth;
    // const 슬라이드너비 = document.black.clientWidth;
    const sliderContainer = document.querySelector(`.slider`);
    let 슬라이드너비 = sliderContainer.clientWidth;
    //let은 변할 수 있는 값 넣을때

    window.addEventListener('resize',()=>{
        슬라이드너비 = sliderContainer.clientWidth;
    });

    nextButton.addEventListener("click",()=>{
        if(index === (black-1)){
            index = 0;
        }else{
            index++;
        }
        slidWrapper.style.transform = `translateX(-${슬라이드너비*index}px)`;
    });

    prevButton.addEventListener("click",()=>{
        if(index===0){
            index = (black-1);
        }else{
            index--;
        }
        slidWrapper.style.transform = `translateX(-${슬라이드너비*index}px)`
    });

}

