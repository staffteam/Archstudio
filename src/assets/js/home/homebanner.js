export default {
  homebanner () {
    return new Swiper('#homeBanner', {
      loop: true, // 循环模式选项
      autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination.a',
        clickable: true
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next.a',
        prevEl: '.swiper-button-prev.a'
      }
    })
  },
  homebanner2 (the) {
    return new Swiper('#list3banner', {
      watchSlidesProgress: true,
      slidesPerView: 3,
      centeredSlides: true,
      loopedSlides: 3,
      loop:true,
      navigation: {
        nextEl: '.swiper-button-next.b',
        prevEl: '.swiper-button-prev.b'
      },
      on: {
        progress: function (progress) {
          for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides.eq(i);
            let slideProgress = this.slides[i].progress;
            let modify = 1;
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
            }
            let translate = slideProgress * modify * -30 + 'px';
            let scale = 1 - Math.abs(slideProgress) / 5;
            let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
            slide.transform(
              'translateX(' + translate + ') scale(' + scale + ')'
            );
            slide.css('zIndex', zIndex);
            slide.css('opacity', 1);
            if (Math.abs(slideProgress) > 2) {
              slide.css('opacity', 0);
            }
          }
        },
        setTransition: function (transition) {
          for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides.eq(i);
            slide.transition(transition);
          }
        }
      }
    })
  },
  homebanner3 () {
    return new Swiper('#newBanner', {
      loop: true, // 循环模式选项
      autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination.c',
        clickable: true
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next.c',
        prevEl: '.swiper-button-prev.c'
      }
    })
  },
  homebanner4 (e) {
    let len=0;
    if(window.innerWidth < 800){
      len = e.newBannerData2.length>2?2:e.newBannerData2.length;
    }else{
      len = e.newBannerData2.length>4?4:e.newBannerData2.length;
    }
    return new Swiper('#newBanner2', {
      loop: true, // 循环模式选项
      slidesPerView : len,
      slidesPerView : len,
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next.d',
        prevEl: '.swiper-button-prev.d'
      }
    })
  }
}
