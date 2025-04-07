document.addEventListener('DOMContentLoaded', () => {
    const universitySelect = document.getElementById('universitySelect');
    const majorSelect = document.getElementById('majorSelect');
    const searchButton = document.getElementById('searchButton');
    const resultDiv = document.getElementById('result');

    // 대학별 학과 데이터 (샘플 데이터)
    const universityData = {
        "서울대학교": {
            "심리학과": {
                "인문계열": {
                    "최저점수": 380,
                    "평균점수": 395,
                    "최고점수": 410,
                    "모집인원": 30,
                    "지원자수": 120,
                    "경쟁률": "4.0:1"
                }
            },
            "경제학과": {
                "인문계열": {
                    "최저점수": 385,
                    "평균점수": 400,
                    "최고점수": 415,
                    "모집인원": 35,
                    "지원자수": 140,
                    "경쟁률": "4.0:1"
                }
            },
            "국어국문학과": {
                "인문계열": {
                    "최저점수": 375,
                    "평균점수": 390,
                    "최고점수": 405,
                    "모집인원": 25,
                    "지원자수": 100,
                    "경쟁률": "4.0:1"
                }
            }
        },
        "연세대학교": {
            "심리학과": {
                "인문계열": {
                    "최저점수": 370,
                    "평균점수": 385,
                    "최고점수": 400,
                    "모집인원": 25,
                    "지원자수": 100,
                    "경쟁률": "4.0:1"
                }
            },
            "경제학과": {
                "인문계열": {
                    "최저점수": 375,
                    "평균점수": 390,
                    "최고점수": 405,
                    "모집인원": 30,
                    "지원자수": 120,
                    "경쟁률": "4.0:1"
                }
            }
        },
        "고려대학교": {
            "심리학과": {
                "인문계열": {
                    "최저점수": 365,
                    "평균점수": 380,
                    "최고점수": 395,
                    "모집인원": 20,
                    "지원자수": 80,
                    "경쟁률": "4.0:1"
                }
            },
            "경제학과": {
                "인문계열": {
                    "최저점수": 370,
                    "평균점수": 385,
                    "최고점수": 400,
                    "모집인원": 25,
                    "지원자수": 100,
                    "경쟁률": "4.0:1"
                }
            }
        }
    };

    // 대학 선택 시 해당 대학의 학과 목록 업데이트
    universitySelect.addEventListener('change', () => {
        const selectedUniversity = universitySelect.value;
        majorSelect.innerHTML = '<option value="" selected disabled>학과를 선택하세요</option>';
        
        if (selectedUniversity && universityData[selectedUniversity]) {
            Object.keys(universityData[selectedUniversity]).forEach(major => {
                const option = document.createElement('option');
                option.value = major;
                option.textContent = major;
                majorSelect.appendChild(option);
            });
        }
    });

    // 검색 버튼 클릭 시 결과 표시
    searchButton.addEventListener('click', () => {
        const selectedUniversity = universitySelect.value;
        const selectedMajor = majorSelect.value;
        
        if (!selectedUniversity || !selectedMajor) {
            Swal.fire({
                title: '선택 오류',
                text: '대학과 학과를 모두 선택해주세요',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#4f46e5'
            });
            return;
        }
        
        // 로딩 애니메이션 표시
        Swal.fire({
            title: '검색 중...',
            html: '잠시만 기다려주세요',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        // 1초 후에 결과 표시
        setTimeout(() => {
            const majorData = universityData[selectedUniversity][selectedMajor];
            displayResults(selectedUniversity, selectedMajor, majorData);
        }, 1000);
    });

    // 결과 표시 함수
    function displayResults(university, major, data) {
        const resultHTML = `
            <div class="result-item">
                <h3 class="text-xl font-bold text-indigo-600 mb-3">${university} ${major}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="mb-2"><strong>계열:</strong> ${Object.keys(data)[0]}</p>
                        <p class="mb-2"><strong>모집인원:</strong> ${data[Object.keys(data)[0]].모집인원}명</p>
                        <p class="mb-2"><strong>지원자수:</strong> ${data[Object.keys(data)[0]].지원자수}명</p>
                        <p class="mb-2"><strong>경쟁률:</strong> ${data[Object.keys(data)[0]].경쟁률}</p>
                    </div>
                    <div>
                        <p class="mb-2"><strong>최저점수:</strong> <span class="score-badge">${data[Object.keys(data)[0]].최저점수}점</span></p>
                        <p class="mb-2"><strong>평균점수:</strong> <span class="score-badge">${data[Object.keys(data)[0]].평균점수}점</span></p>
                        <p class="mb-2"><strong>최고점수:</strong> <span class="score-badge">${data[Object.keys(data)[0]].최고점수}점</span></p>
                    </div>
                </div>
            </div>
        `;
        
        resultDiv.innerHTML = resultHTML;
        
        // 결과 알림
        Swal.fire({
            title: '검색 완료!',
            html: `${university} ${major}의 정시 점수 정보를 확인하세요`,
            icon: 'success',
            confirmButtonText: '확인',
            confirmButtonColor: '#4f46e5',
            timer: 3000,
            timerProgressBar: true
        });
    }
});