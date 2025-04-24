const API_URL = "https://mbti-image-generator-fvfr.vercel.app/generate";

async function generateResult() {
  const my = document.getElementById("myMbti").value;
  const partner = document.getElementById("partnerMbti").value;
  const style = document.getElementById("style").value;

  if (!my || !partner || !style) {
    alert("모든 항목을 선택해주세요.");
    return;
  }

  const prompt = `${my}와 ${partner}의 궁합을 ${style} 느낌으로 표현한 감성 이미지`;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    if (data?.url) {
      document.getElementById("result").classList.remove("hidden");
      document.getElementById("resultImage").src = data.url;
    } else {
      alert("❌ 이미지 생성에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("❌ API 오류:", error);
    alert("⚠️ 이미지 생성 중 오류가 발생했습니다.");
  }
}

function downloadImage() {
  const link = document.createElement("a");
  link.href = document.getElementById("resultImage").src;
  link.download = "mbti_result.png";
  link.click();
}
