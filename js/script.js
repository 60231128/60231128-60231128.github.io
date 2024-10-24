$(document).ready(function () {
  setTimeout(function () {
    $(".moon").addClass("show"); // 'show' 클래스 추가
  }, 1000); // 페이지 로드 후 1초 뒤 애니메이션 실행
});

$(document).ready(function () {
  // 페이지 로드 시 건물 애니메이션 시작
  setTimeout(function () {
    $(".building-container").addClass("show"); // 'show' 클래스 추가
  }, 1500); // 페이지 로드 후 1.5초 지연 후 실행
});

$(document).ready(function () {
  // 페이지 로드 후 음표 애니메이션 시작
  setTimeout(function () {
    $(".note1-container").addClass("show"); // 첫 번째 음표 등장
  }, 2000); // 2초 후 실행

  setTimeout(function () {
    $(".note2-container").addClass("show"); // 두 번째 음표 등장
  }, 3000); // 3초 후 실행
});

$(document).ready(function () {
  let current = 0; // 현재 보여지는 이미지 인덱스
  const silhouettes = $(".dancing-silhouette"); // 모든 실루엣 이미지 선택

  function showNextSilhouette() {
    // 현재 이미지 숨기기
    $(silhouettes[current]).removeClass("show");

    // 다음 이미지로 이동 (마지막 이미지 다음에는 첫 번째로 돌아감)
    current = (current + 1) % silhouettes.length;

    // 다음 이미지 보여주기
    $(silhouettes[current]).addClass("show");
  }

  // 3초마다 이미지 전환
  setInterval(showNextSilhouette, 3000);

  // 첫 번째 이미지 초기화
  $(silhouettes[0]).addClass("show");
});

$(document).ready(function () {
  // 2초 후에 각 오브젝트가 순서대로 등장
  setTimeout(function () {
    $(".bench-container, .cat-container, .streetlamp-container").addClass(
      "active"
    );
  }, 2000); // 달이 뜬 후 2초 대기 후 시작
});

$(document).ready(function () {
  function typeText(element, text, index) {
    if (index < text.length) {
      $(element).append(text.charAt(index)); // 한 글자씩 추가
      setTimeout(function () {
        typeText(element, text, index + 1); // 다음 글자 추가
      }, 100); // 각 글자 간의 시간 간격 (밀리초)
    }
  }

  // 각 요소에 대해 순서대로 타이핑 애니메이션 실행
  $(".typewriter").each(function (i) {
    let element = $(this);
    let text = element.text();
    element.text(""); // 기존 텍스트 제거 후 타이핑 시작
    setTimeout(function () {
      typeText(element, text, 0); // 타이핑 애니메이션 실행
    }, i * 3000); // 각 문장이 순차적으로 등장 (3초 간격)
  });
});
