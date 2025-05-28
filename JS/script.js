$(function () {
  
  /*==================================
  現在の選択結果を保持するオブジェクト
  ==================================*/
  let result = { line1: "", line2: "", line3: "" };

  /*==================================
  配列からランダムな要素を取得する
  ==================================*/

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /*==================================
  選択結果を保存し、ログを更新する。localStorageを使用
  ==================================*/

  function checkAndSave() {
    if (result.line1 && result.line2 && result.line3) {
      const story = `${result.line1}<br>${result.line2}<br>${result.line3}`;
      let history = JSON.parse(localStorage.getItem("burodenHistory") || "[]");
      history.unshift(story);
      localStorage.setItem("burodenHistory", JSON.stringify(history));
      showHistory();
    }
  }

  /*==================================
  ログを表示する
  ==================================*/

  function showHistory() {
    let history = JSON.parse(localStorage.getItem("burodenHistory") || "[]");
    let html = history
      .map(
        (item) =>
          `<div style="padding: 10px 0; border-bottom: 2px solid #ccc; margin-bottom: 10px;">${item}</div>`
      )
      .join("");
    $("#history").html(html);
  }

  /*==================================
  現在の選択をリセットする
  ==================================*/

  function resetCurrentStory() {
    result = { line1: "", line2: "", line3: "" };
    ["line1", "line2", "line3"].forEach((id) => {
      $(`#${id}`).html("クリックして確認").removeClass("confirmed");
    });
  }

  /*==================================
  リトライやリセット
  ==================================*/

  function resetHistory() {
    localStorage.removeItem("burodenHistory");
    showHistory();
  }

  $("#retry").on("click", function () {
    location.reload();
  });

  $("#reset").on("click", function () {
    resetHistory();
    resetCurrentStory();
  });

  /*==================================
  ボタンのクリックイベント
  ==================================*/

  ["line1", "line2", "line3"].forEach((id) => {
    $(`#${id}`).on("click", function () {
      if (!result[id]) {
        const randomText = getRandom(lines[id]);
        result[id] = randomText;
        $(this).html(randomText).addClass("confirmed");
  
        // ボックスとフォントを一時的に大きくする
        $(this).css({
          transform: "scale(1.6)", 
          transition: "transform 0.2s ease", 
        });
  
        // 0.5秒後に元に戻す
        setTimeout(() => {
          $(this).css({
            transform: "scale(1)", 
          });
        }, 500);
  
        checkAndSave();
      }
    });
  });
  /*==================================
  ログの表示・非表示を切り替える（アコーディオン）
  ==================================*/

  document
    .getElementById("toggle-history")
    .addEventListener("click", function () {
      const historyDiv = document.getElementById("history");
      if (historyDiv.style.display === "none") {
        historyDiv.style.display = "block"; // 開く
      } else {
        historyDiv.style.display = "none"; // 閉じる
      }
    });

  $("#resetStory").on("click", resetCurrentStory);
  $("#resetHistory").on("click", resetHistory);

  /*==================================
  初期化処理
  ==================================*/
  showHistory();
});
