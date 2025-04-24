async function generateResult() {
  const my = document.getElementById("myMbti").value;
  const partner = document.getElementById("partnerMbti").value;
  const style = document.getElementById("style").value;

  const prompt = `${my}와 ${partner}의 궁합을 ${style} 느낌으로 표현한 감성 이미지`;

  const res = await fetch("https://mbti-image-generator-fvfr.vercel.app/generate", {
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
    alert("이미지를 불러오지 못했습니다.");
  }
}

function downloadImage() {
  const link = document.createElement("a");
  link.href = document.getElementById("resultImage").src;
  link.download = "mbti_result.png";
  link.click();
}
