/**
 * 23. 베스트앨범
 * https://school.programmers.co.kr/learn/courses/30/lessons/42579
 *
 * 스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.
 *  1. 한 노래가 많이 재생된 장르를 먼저 수록합니다.
 *  2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
 *  3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
 *  4. 노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.
 *
 * 제한사항
 *  - genres[i]는 고유번호가 i인 노래의 장르입니다.
 *  - plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
 *  - genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
 *  - 장르 종류는 100개 미만입니다.
 *  - 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
 *  - 모든 장르는 재생된 횟수가 다릅니다.
 *
 * 입출력 예
 * 1.
 *  input => genres: ["classic", "pop", "classic", "classic", "pop"], plays: [500, 600, 150, 800, 2500]
 *  output => [4, 1, 3, 0]
 */

function solution(genres, plays) {
  var answer = [];

  const n = genres.length;
  const totalPlays = new Map();
  const hash = new Map();

  for (let i = 0; i < n; i++) {
    const [genre, play] = [genres[i], plays[i]];

    if (!hash.has(genre)) {
      totalPlays.set(genre, 0);
      hash.set(genre, []);
    }

    totalPlays.set(genre, totalPlays.get(genre) + play);
    hash.set(genre, [...hash.get(genre), { id: i, play }]);
  }
  //   console.log(totalPlays);
  //   console.log(hash);

  const totalPlaysSorted = Array.from(totalPlays, ([genre, play]) => ({
    genre,
    play,
  })).sort((a, b) => b.play - a.play);

  for (let i = 0; i < totalPlaysSorted.length; i++) {
    const { genre } = totalPlaysSorted[i];

    hash
      .get(genre)
      .sort((a, b) => b.play - a.play)
      .slice(0, 2)
      .forEach((album) => answer.push(album.id));
  }

  return answer;
}

console.log(
  solution(
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 150, 800, 2500]
  )
);
