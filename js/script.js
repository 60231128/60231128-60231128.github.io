$(document).ready(function () {
  setTimeout(function () {
    $(".moon").addClass("show"); // 'show' 클래스 추가
  }, 1000); // 페이지 로드 후 1초 뒤 애니메이션 실행
});

$(document).ready(function () {
  // 페이지 로드 후 1.5초 후 건물 애니메이션 실행
  setTimeout(function () {
    $(".building-container").addClass("show");
  }, 1500);
});

// 가로등
$(document).ready(function () {
  // 3초 후 가로등이 등장 (불빛은 꺼진 상태로 유지)
  setTimeout(function () {
    $(".streetlamp-container").css("opacity", "1"); // 3초 후 가로등만 보이게 설정
  }, 3000);

  // 가로등 클릭 시 불빛 켜기/끄기
  $(".streetlamp-container").on("click", function () {
    $(this).toggleClass("active"); // 클릭할 때마다 active 클래스 토글
  });
});

//댄스 실루엣
// 댄스 실루엣 애니메이션 - 2초 후부터 순서대로 나타남
$(document).ready(function () {
  let current = 0;
  const silhouettes = $(".dancing-silhouette");
  const totalSilhouettes = silhouettes.length;

  function showNextSilhouette() {
    $(silhouettes[current]).fadeOut(400, function () {
      // 다음 이미지로 이동 (마지막 이미지 다음에는 첫 번째로 돌아감)
      current = (current + 1) % totalSilhouettes;

      // 다음 이미지 나타나게 하기
      $(silhouettes[current]).fadeIn(400);
    });
  }

  // 모든 이미지를 숨기고 첫 번째 이미지만 보이도록 초기화
  silhouettes.hide();

  // 2초 후 첫 번째 실루엣이 등장하고, 이후 애니메이션 시작
  setTimeout(function () {
    $(silhouettes[0]).show(); // 첫 번째 실루엣 2초 후 등장
    setInterval(showNextSilhouette, 900); // 1초 간격으로 이미지 전환
  }, 3000); // 2초 지연 후 애니메이션 시작
});

//벤치 고양이 등장
$(document).ready(function () {
  // 2초 후에 벤치와 고양이가 등장
  setTimeout(function () {
    $(".bench-container").addClass("show");
    $(".cat-container").addClass("show");
  }, 2000);
});

//글자 타이핑
$(document).ready(function () {
  $("h1").on("click", function () {
    $(".music")[0].play();
  });

  function typeText(element, text, index) {
    if (index < text.length) {
      $(element).append(text.charAt(index)); // 한 글자씩 추가
      setTimeout(function () {
        typeText(element, text, index + 1); // 다음 글자 추가
      }, 100); // 각 글자 간의 타이핑 속도 (밀리초)
    }
  }

  // 타이핑 애니메이션을 3초 지연 후에 시작
  $(".typewriter-text").each(function (i) {
    const element = $(this);
    const text = element.text();
    element.text(""); // 기존 텍스트 제거 후 타이핑 시작

    // 각 텍스트에 대해 3초 지연 후 타이핑 애니메이션 시작
    setTimeout(function () {
      typeText(element, text, 0); // 타이핑 애니메이션 시작
    }, 3000 + i * 2000); // 3초 지연 후 각 텍스트는 2초 간격으로 시작
  });
});

//폭죽
$(document).ready(function () {
  const colours = [
    "#c084f5",
    "#8a2be2",
    "#e070e0",
    "#d98ddf",
    "#a64eb7",
    "#b38cd9",
    "#cc7ecc",
    "#87CEEB",
    "#FFD700",
    "#FF69B4",
  ];
  const screenWidth = $(window).width();
  const screenHeight = $(window).height();

  function launchFirework() {
    const startX = Math.random() * screenWidth;
    const endY = Math.random() * screenHeight * 0.5;

    // 폭죽 발사체 모양 설정
    const fireworkSymbols = ["|", "\\", "/"];
    const $firework = $("<div class='firework'></div>").text(
      fireworkSymbols[Math.floor(Math.random() * fireworkSymbols.length)]
    );
    $firework.css({
      left: startX + "px",
      top: screenHeight + "px",
      color: colours[Math.floor(Math.random() * colours.length)],
    });

    $("body").append($firework);

    // 발사체 애니메이션 - 위로 올라가다가 터짐
    $firework.animate({ top: endY + "px" }, 1000, "linear", function () {
      // 터질 때 발사체 제거하고 별 모양 입자 생성
      $firework.remove();
      explode(startX, endY);
    });
  }

  function explode(x, y) {
    const numSparks = 50; // 별 입자의 수
    for (let i = 0; i < numSparks; i++) {
      const $spark = $("<div class='spark'>\u2736</div>"); // ★ 유니코드 별 모양 사용
      const color = colours[Math.floor(Math.random() * colours.length)];
      const angle = Math.random() * 2 * Math.PI; // 무작위 각도
      const distance = Math.random() * 150 + 50; // 50~200px 거리

      const endX = x + Math.cos(angle) * distance;
      const endY = y + Math.sin(angle) * distance;

      $spark.css({
        left: x + "px",
        top: y + "px",
        color: color,
        opacity: 1,
        transform: "scale(0.5)",
      });

      $("body").append($spark);

      // 별 입자 애니메이션 - 퍼지면서 사라짐
      $spark.animate(
        {
          left: endX + "px",
          top: endY + "px",
          opacity: 0,
        },
        {
          duration: 1500,
          step: function (now, fx) {
            if (fx.prop === "left" || fx.prop === "top") {
              $(this).css("transform", "scale(" + (1 - now / distance) + ")");
            }
          },
          complete: function () {
            $spark.remove(); // 애니메이션 후 요소 제거
          },
        }
      );
    }
  }

  // 폭죽을 3초 후부터 주기적으로 발사
  setTimeout(function () {
    setInterval(launchFirework, 600); // 0.6초 간격으로 새로운 폭죽 발사
  }, 3000); // 3초 지연 후 시작
});

//전구
$(document).ready(function () {
  // 3초 후에 첫 번째와 두 번째 전구 컨테이너가 보이도록 설정
  setTimeout(function () {
    $(".bulb1-container").addClass("show");
    $(".bulb2-container").addClass("show");
  }, 3000); // 3초 지연
});

$(document).ready(function () {
  setTimeout(function () {
    $(".ground-image").addClass("show");
  }, 2000); // 페이지 로드 후 1초 뒤 애니메이션 실행
});

$(document).ready(function () {
  setTimeout(function () {
    $(".city-image").addClass("show");
  }, 2000); // 1초 후에 show 클래스 추가
});

$(document).ready(function () {
  // 페이지 로드 후 5초 뒤 파이프 이미지가 나타남
  setTimeout(function () {
    $(".saxophone-image").addClass("show");
  }, 6000);
  // 파이프가 나타난 뒤 7초 후에 음표가 등장하도록 설정
  setTimeout(function () {
    $(".musical-notes").addClass("show");
  }, 7000);
});
