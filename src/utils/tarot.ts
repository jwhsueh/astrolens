export interface TarotCard {
  id: string;
  name: string;
  category: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
  categoryLabel: string;
  symbol: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  pastInterpretation: { upright: string; reversed: string };
  presentInterpretation: { upright: string; reversed: string };
  futureInterpretation: { upright: string; reversed: string };
}

// 22 Major Arcana Cards
const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'fool',
    name: '00. 愚者 (The Fool)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🃏',
    uprightKeywords: ['起點', '純真', '自發性', '自由', '初生牛犢之勇'],
    reversedKeywords: ['冒險盲目', '粗心大意', '不負責任', '遲疑退縮', '混亂開端'],
    pastInterpretation: {
      upright: '過去你開啟了一段全新的旅程，充滿無限可能，當時你拋開了所有顧慮與束縛。',
      reversed: '過去曾有一場不理智、過度盲目的冒險，或是一次因準備不足而遭遇不穩定的新起點。'
    },
    presentInterpretation: {
      upright: '現在正是大膽躍進、踏上未知道路的時刻，宇宙正鼓勵你保持純真與大無畏的信任。',
      reversed: '當下你可能面臨抉擇，但存在魯莽行事的風險。此時應暫緩腳步，切忌盲目相信他人。'
    },
    futureInterpretation: {
      upright: '未來將出現一個顛覆常規的新機會，激發你探索未知的勇氣，帶來思想上的全面解脫。',
      reversed: '未來發展可能伴隨不確定性與不負責任的局面。你需提防缺乏規劃而走入盲目的胡同。'
    }
  },
  {
    id: 'magician',
    name: '01. 魔術師 (The Magician)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🪄',
    uprightKeywords: ['專注力', '創造力', '顯化力', '資源掌控', '強大意志'],
    reversedKeywords: ['虛張聲勢', '操縱手段', '才能閒置', '欺騙幻術', '能量阻塞'],
    pastInterpretation: {
      upright: '在過去的事件中，你展現了高超的個人才華，成功將想法付諸實踐並掌握了關鍵工具。',
      reversed: '過去曾有人試圖暗中操縱局勢，或是你空有一身才華和天賦卻因缺乏專注而未能展現。'
    },
    presentInterpretation: {
      upright: '當前你擁有一切成功的要素與完美資源。相信你的行動力，用你心中的意念去顯化結果。',
      reversed: '此時你可能感到心有餘而力不足，或身邊充斥著不誠實的訊息、虛偽的主張。小心被表象蒙蔽。'
    },
    futureInterpretation: {
      upright: '未來你將獲得全新的管道，能得心應手地調度各方資源，開闢一個極具主導權的新起點。',
      reversed: '未來可能會出現缺乏周詳計劃的局勢，或是天賦遭到浪費、遭遇名不副實的人事挑戰。'
    }
  },
  {
    id: 'priestess',
    name: '02. 女祭司 (The High Priestess)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '📖',
    uprightKeywords: ['潛意識', '直覺', '神祕學', '靜止不動', '智慧奧秘'],
    reversedKeywords: ['忽視直覺', '流於表面', '隱秘洩漏', '歇斯底里', '冷漠孤傲'],
    pastInterpretation: {
      upright: '你曾度過了一段內省、沈靜，並透過敏銳直覺看穿世俗迷霧的靜息期。',
      reversed: '過去你可能忽視了內心最真實的心靈聲音，或者過於被動封閉而錯失與外界溝通的機會。'
    },
    presentInterpretation: {
      upright: '當下不宜急於採取行動。請往內心探索，傾聽你潛意識與靈通直覺的指引，答案自在心中。',
      reversed: '你現在可能過於抗拒直覺、沉溺於浮躁不安，或是在神祕關係中發現了不悅的隱瞞真相。'
    },
    futureInterpretation: {
      upright: '未來你將獲得更高的靈性智慧，心境如同明鏡一般，幫助你於無形中洞悉世局的關鍵規律。',
      reversed: '未來若過度封閉自我或固執己見，將導致人際冷落，或暴露出內心缺乏安全感的焦慮。'
    }
  },
  {
    id: 'empress',
    name: '03. 女皇 (The Empress)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '👑',
    uprightKeywords: ['豐盛', '自然美', '孕育生命', '母愛滋養', '藝術感性'],
    reversedKeywords: ['過度依賴', '創造力停滯', '家庭摩擦', '追求享樂', '掌控欲升級'],
    pastInterpretation: {
      upright: '過去是一個收穫頗豐、充滿溫暖愛意與物質/精神富足的滋養時期。',
      reversed: '過去曾有一段時間，你溺於舒適圈、過度沉溺物質，或是在人際關係上有過度的窒息感。'
    },
    presentInterpretation: {
      upright: '現在是繁榮、豐盛、充滿創造力的黃金階段。你的周遭事物正在肥沃滋養，愛意滿滿。',
      reversed: '當前你可能面臨創造停滯，或是過於溺愛他人、情緒起伏不定、對生活現狀感到缺乏滿足。'
    },
    futureInterpretation: {
      upright: '未來將迎來豐碩飽滿的收成。不論是金錢、情感還是家庭事物，都將蓬勃發展。',
      reversed: '未來需要注意不要將過多精力耗費在不必要的感官享樂上，或是需警惕控制欲帶來的紛爭。'
    }
  },
  {
    id: 'emperor',
    name: '04. 皇帝 (The Emperor)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🛡️',
    uprightKeywords: ['秩序', '權威', '架構', '控制', '堅強父權'],
    reversedKeywords: ['暴政專制', '缺乏自控', '強加秩序', '權威喪失', '頑固不化'],
    pastInterpretation: {
      upright: '過去在穩定規律的秩序下運作，或得益於一位經驗豐富且具社會威望長輩的指引。',
      reversed: '過去的日子裡伴隨著極度教條、嚴苛的規則、或是遭受嚴厲無情的掌控。'
    },
    presentInterpretation: {
      upright: '現在你需要展現鐵腕的自控力、邏輯架構與組織天賦，成為局勢裡值得敬仰的穩定力量。',
      reversed: '當前可能面臨嚴重的秩序混亂，或是面臨強大上司、家長的霸道壓迫，心生逆反。'
    },
    futureInterpretation: {
      upright: '未來你將穩固確立自己的江山與行業根基，成為擁有自主話語權與決策權的領頭羊。',
      reversed: '未來可能會面臨因墨守成規、固步自封而引發的事業危機，或因過於專斷引起眾人不滿。'
    }
  },
  {
    id: 'hierophant',
    name: '05. 教皇 (The Hierophant)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🏛️',
    uprightKeywords: ['傳統體制', '精神導師', '學習傳承', '道德同盟', '契約合作'],
    reversedKeywords: ['反叛常規', '墨守成規', '虛偽教條', '結黨營私', '拒絕良善'],
    pastInterpretation: {
      upright: '過去曾得高人指點，或在成熟的組織和傳統教育框架中獲得安穩的發展起點。',
      reversed: '過去你可能反叛了傳統體制，或是受到一些偽善、道貌岸然的導師誤導。'
    },
    presentInterpretation: {
      upright: '當前適合與理念相同的一群人建立同盟，或者在成熟規則的保障下推進行事。',
      reversed: '當下你感到窒息於世俗教條，渴望衝破陳腐的思想教條，進行一場個人的小規模革命。'
    },
    futureInterpretation: {
      upright: '未來你將找到精神上的指引明燈，並有望簽署長期安穩的合夥良盟或官方契約契約。',
      reversed: '未來若盲目聽信權威，或在固化的舊體制中拒絕轉型，將面臨邊緣化和脫離時代。'
    }
  },
  {
    id: 'lovers',
    name: '06. 戀人 (The Lovers)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '💞',
    uprightKeywords: ['和諧愛戀', '價值對齊', '美妙抉擇', '靈魂伴侶', '合夥關係'],
    reversedKeywords: ['價值錯位', '感情不和', '錯誤抉擇', '不和諧合夥', '逃避責任'],
    pastInterpretation: {
      upright: '過去曾經歷一場深層和諧的人際結合，或做過一個完全尊崇內心真實理念的金玉選擇。',
      reversed: '過去的情感關係中存在著不和諧，或有過一次讓內心飽受拉扯和後悔的錯誤抉擇。'
    },
    presentInterpretation: {
      upright: '當下正有重要的人生交叉路口等待你，亦代表與身邊伴侶的靈魂吸引力達到了極致頂點。',
      reversed: '此時內部價值觀正發生摩擦，有背道而馳之憂。抉擇困難，應冷靜梳理什麼是你的核心。'
    },
    futureInterpretation: {
      upright: '未來將遇到與你完全契合的合作夥伴或靈魂伴侶，攜手前行，雙向奔赴。',
      reversed: '未來有可能面臨人際關係或情感的變局，或是將在一個充滿誘惑的選擇前自亂陣腳。'
    }
  },
  {
    id: 'chariot',
    name: '07. 戰車 (The Chariot)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🏎️',
    uprightKeywords: ['用意志力克服', '凱旋前行', '自控與勝負欲', '出差旅行', '克服障礙'],
    reversedKeywords: ['方向感迷失', '魯莽失控', '精力分散', '中途夭折', '過度好鬥'],
    pastInterpretation: {
      upright: '過去你憑藉強烈的勝負戰意和自我控制理智，跨越了重重障礙與難關，凱旋得勝。',
      reversed: '過去的發展曾有過方向性混亂、精力無謂踩空，或是因為好勝心過強而摔了跟頭。'
    },
    presentInterpretation: {
      upright: '現在是全速推進的進擊期！保持冷靜的頭腦與無上的控制力，你一定能突破障礙奪得桂冠。',
      reversed: '當前你就像方向盤失準的賽車，若不趕快認清核心目標，盲目前進只會遭遇翻車。'
    },
    futureInterpretation: {
      upright: '未來將面臨一場考驗意志力的挑戰，只需集中精力保持航向，必能贏得至高權重與名望。',
      reversed: '未來的旅途可能會伴隨中斷意外，或是好高騖遠、因行事粗心而導致原有的優勢功虧一簣。'
    }
  },
  {
    id: 'strength',
    name: '08. 力量 (Strength)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🦁',
    uprightKeywords: ['溫柔耐力', '內心勇氣', '安撫狂躁', '極致韌性', '同理心'],
    reversedKeywords: ['軟弱無能', '暴力解決', '內耗焦慮', '自信喪失', '怒火衝心'],
    pastInterpretation: {
      upright: '過去你依靠無與倫比的情緒智慧與沈默耐力，成功降伏了生命中的咆哮猛獸。',
      reversed: '過去在一些困局中，你顯得過於懦弱，或者曾短暫失控、流於用偏激情緒意氣用事。'
    },
    presentInterpretation: {
      upright: '當下面對困難的挑戰，請發揮「以柔克剛」的溫和意志力。同理心是解決僵局的最佳魔法。',
      reversed: '現在你可能感到深受自我懷疑折磨，能量枯竭，此時不要試圖強攻，應修復內心的寧靜。'
    },
    futureInterpretation: {
      upright: '未來你將擁有強大的自信心修復能量，展現不屈的領袖魅力，於潛移默化中收服所有阻力。',
      reversed: '未來應提防因內部膽怯而妥協，或者因為情緒衝動引爆與外界不可調和的尖銳對抗。'
    }
  },
  {
    id: 'hermit',
    name: '09. 隱士 (The Hermit)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🕯️',
    uprightKeywords: ['沉省自處', '靈魂探索', '尋找燈火', '智慧導師', '暫避塵囂'],
    reversedKeywords: ['孤傲與不群', '社交孤立', '悲觀逃避', '一意孤行', '錯過真相'],
    pastInterpretation: {
      upright: '過去你經歷了一段向內求索的心路歷程，遠離人群繁雜，找到了內心堅定的答案。',
      reversed: '過去你可能因過於孤僻自傲惹人反感，或者因拒絕接受周遭善意而將自己陷入孤立無援。'
    },
    presentInterpretation: {
      upright: '當前是極佳的自處與學習階段。提燈向內心照耀，暫停喧鬧，唯有沉靜才能讓真相顯露。',
      reversed: '當前你可能在孤立中產生悲觀或退縮心理，或是為逃避現實難關而故意將自己藏了起來。'
    },
    futureInterpretation: {
      upright: '未來你將成為某領域的資深智者、顧問，或是找到一條通往靈魂深層奧秘的和諧道路。',
      reversed: '未來的路上要警惕一意孤行帶來的盲區，或是因為不合群、過度懷疑外界而錯失好機緣。'
    }
  },
  {
    id: 'fortune_wheel',
    name: '10. 命運之輪 (Wheel of Fortune)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🎡',
    uprightKeywords: ['好運驟臨', '靈魂宿命', '重大轉機', '因果循環', '嶄新機會'],
    reversedKeywords: ['壞運纏身', '抵抗無效', '因果惡報', '時來未運', '外界阻礙'],
    pastInterpretation: {
      upright: '過去發生過一次重大的天象巧合，瞬間扭轉了你的生平軌跡，為你注入滿滿的好能量。',
      reversed: '過去你可能曾與好運擦肩而過，或是在一個突如其來的因果波動中受到了暫時的打擊。'
    },
    presentInterpretation: {
      upright: '命運之輪正全力加速轉向有利於你的方向，意外驚喜即將來敲門，順流而行吧！',
      reversed: '當前你可能感到受到命運作弄，或處於不順遂的低谷。請明白：輪盤會繼續轉，低谷也是轉機。'
    },
    futureInterpretation: {
      upright: '未來將有一個宿命般的黃金機遇降落心間，顛覆現狀，帶領你走向極其輝煌的上坡路。',
      reversed: '未來一段時間運勢會有些跌宕起伏，需要特別注意規避高風險投資，保持穩健度日。'
    }
  },
  {
    id: 'justice',
    name: '11. 正義 (Justice)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '⚖️',
    uprightKeywords: ['公平客觀', '明辨是非', '法律訴訟', '平衡協調', '因果正義'],
    reversedKeywords: ['偏見不公', '不負責任', '指責怪罪', '敗訴糾紛', '失衡失序'],
    pastInterpretation: {
      upright: '過去你在客觀冷靜的權衡後，做出了問心無愧的理智決策，種下了公平的因果。',
      reversed: '過去可能遭受過某些偏頗的對待、不公平的評估，亦或當時試圖逃避自己做錯的責任。'
    },
    presentInterpretation: {
      upright: '現在是用理性、公正思維作決定的關鍵時刻。如果你正面臨官方合作、法律合同，結果將是公正的。',
      reversed: '當前似乎面臨失衡、心有偏見的局面，或是感情、事業上受到了某種不客觀的指責。'
    },
    futureInterpretation: {
      upright: '未來塵埃落定時，必定會獲得你應得的回報，公理和付出都將得到等比例的完美正義。',
      reversed: '未來可能會出現合同或法律方面的麻煩糾紛，需要注意行文用字，保持行事作風正派。'
    }
  },
  {
    id: 'hanged_man',
    name: '12. 吊人 (The Hanged Man)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🛐',
    uprightKeywords: ['獻身犧牲', '轉換視角', '甘於等待', '內心平靜', '另眼看世界'],
    reversedKeywords: ['無謂掙扎', '無謂白費', '逃避責任', '思想僵化', '停滯不前'],
    pastInterpretation: {
      upright: '過去你曾甘願為了大局做出暫時的克制、等待，並從另一個全新的視角中獲得大徹大悟。',
      reversed: '過去的一段時間充滿了沉悶和無可奈何的停滯，那時你做出了許多徒勞無功的掙扎。'
    },
    presentInterpretation: {
      upright: '當前雖然大局看似靜止，但並非壞事。倒過來看世界，這是一次靈魂能量淨化的珍貴空窗期。',
      reversed: '此時在一個無聊的泥潭裡感到不耐與焦躁，試圖強行抽離或盲目掙扎，反而容易越陷越深。'
    },
    futureInterpretation: {
      upright: '未來將會有一場高維度的覺醒或心甘情願的付出，引領你昇華凡俗目光。',
      reversed: '若不學會放手，未來有可能仍將被困在被動等待的窘境裡，或是陷入思想上的閉塞不通。'
    }
  },
  {
    id: 'death',
    name: '13. 死神 (Death)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '💀',
    uprightKeywords: ['自然終結', '大破大立', '徹底告別', '鳳凰涅槃', '不可逆轉'],
    reversedKeywords: ['苟延殘喘', '抗拒變革', '沉溺舊痛', '迴光返照', '延遲新生'],
    pastInterpretation: {
      upright: '過去經歷了一次震撼的、徹頭徹尾、不可逆的告別，某個重要篇章已經永遠關閉。',
      reversed: '過去你曾死守著早已乾涸、壞死的舊格局不放手，拒絕面對破舊迎新的必然趨勢。'
    },
    presentInterpretation: {
      upright: '現在不要抗拒！讓那些早已無用、對你沒有靈能滋養的事物順從地逝去吧，大立之前必有大破。',
      reversed: '你現在極力抗拒著即將到來的巨大改變。緊緊抓住殘枝枯葉只會延緩真正的靈魂新生。'
    },
    futureInterpretation: {
      upright: '未來你將破繭成蝶，告別過去所有沉重負擔，走向一場完全徹底的新生命洗禮。',
      reversed: '未來將會歷經一陣拖泥帶水的陣痛交割期。要想徹底翻身，你必須下定勇氣斬斷過去情面。'
    }
  },
  {
    id: 'temperance',
    name: '14. 節制 (Temperance)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🍵',
    uprightKeywords: ['完美融匯', '克制平衡', '靈肉整合', '淨化溝通', '水乳交融'],
    reversedKeywords: ['極端失序', '元素衝突', '缺乏節制', '各說各話', '消化不良'],
    pastInterpretation: {
      upright: '過去你在多方複雜勢力或自我靈魂的能量拉扯中，找到了完美的和諧平衡點。',
      reversed: '過去曾有一段時間充滿極端言行、缺乏自我約束，或是各方意見南轅北轍，交流受阻。'
    },
    presentInterpretation: {
      upright: '當前極其適合居中協調、養生調息。用如水般的柔韌流暢，將多方分歧優美地融會貫通。',
      reversed: '當下你感到心浮氣躁、能量嚴重失調，或是與身邊的人在最基本的價值層面雞同鴨講。'
    },
    futureInterpretation: {
      upright: '未來你將展現驚人的情商魅力，在和諧的流動中尋求妥帖之道，身心健康大放異彩。',
      reversed: '未來警惕不要採取偏激極端的極化手段。缺乏自控或急功近利，極易招致全局的坍塌。'
    }
  },
  {
    id: 'devil',
    name: '15. 惡魔 (The Devil)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '😈',
    uprightKeywords: ['金錢黑肉慾', '束縛依賴', '黑暗執念', '感官狂歡', '心甘墮落'],
    reversedKeywords: ['覺醒解脫', '擺脫枷鎖', '克服執念', '戒除惡習', '看清真相'],
    pastInterpretation: {
      upright: '過去你可能被某種物質慾望、不正常的成癮關係或金錢慾望深深束縛，欲罷不能。',
      reversed: '過去你做出過一個極具開創性的主動覺醒，打破了桎梏你心靈的沉重金屬鎖鏈。'
    },
    presentInterpretation: {
      upright: '你現在正面臨巨大的感官誘惑與控制遊戲，在貪婪或偏執的陰影下，你感到被無形鎖鏈給銬住了。',
      reversed: '現在曙光顯現！你開始反思那些令你上癮的人事物，並準備好收回自己的生命力量。'
    },
    futureInterpretation: {
      upright: '未來切不可走捷徑。要提防不良借貸、情慾遊戲，或是可能遭遇唯利是圖的人際夥伴。',
      reversed: '未來的你將以智慧和決心踏出生天，撕下依賴的假面，踏上重新自由掌控靈格的道路。'
    }
  },
  {
    id: 'tower',
    name: '16. 高塔 (The Tower)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '⚡',
    uprightKeywords: ['突發劇變', '幻想破滅', '當頭棒喝', '結構瓦解', '震驚解脫'],
    reversedKeywords: ['驚天餘波', '苟延殘喘', '迴避大震', '拒絕廢墟', '微弱預警'],
    pastInterpretation: {
      upright: '過去曾發生過一次晴天霹靂般的重大事件，瞬間震碎了你虛假的防備，令人猝不及防。',
      reversed: '過去你驚險地避過了一場滅頂之災，或是曾長久處在山雨欲來的危險震盪邊緣。'
    },
    presentInterpretation: {
      upright: '當前正處在混亂瓦解的風暴中心。請記住：只有虛假或不牢固的架構才會崩塌，這是重獲真知的大好機會。',
      reversed: '危機正在緩慢聚集或延遲引爆。不願意直面眼前的弊端，只會讓痛苦被無休止拉長。'
    },
    futureInterpretation: {
      upright: '未來某個早已陳舊甚至腐敗的現狀，將會經由外部不可抗力而被暴力打破。雖然震驚，但這是鳳涅槃。',
      reversed: '未來的考驗會以較微弱、斷續的形式出現，請提前排查各類不穩定因素，做足安全墊。'
    }
  },
  {
    id: 'star',
    name: '17. 星星 (The Star)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '⭐',
    uprightKeywords: ['希望指引', '心靈療癒', '宇宙慈悲', '坦誠無私', '美好願景'],
    reversedKeywords: ['信心悲觀', '靈感枯竭', '美夢錯覺', '迷失北極', '不切實際'],
    pastInterpretation: {
      upright: '在經歷了過去的風暴之後，你獲得了深沉美好的心靈洗滌，重建了對明天的信任。',
      reversed: '過去你可能沉溺在無盡的灰心悲觀中，覺得整片星空和出路都對你關閉了門戶。'
    },
    presentInterpretation: {
      upright: '你現在由內而外散發著寧靜優美的療癒能量。請保持一顆真誠坦蕩、毫不遮掩的心去追求純粹。',
      reversed: '現在你可能感到靈感匱乏，對未來目標感到迷失，需要重新找回你的信仰之光。'
    },
    futureInterpretation: {
      upright: '未來將迎來極為吉瑞的靈感湧現與希望降臨，你對美好的期許在經歷時間洗禮後終將成真。',
      reversed: '未來需謹防陷入海市蜃樓的過度幻想，切忌將毫無根基的海報幻影當作唯一的指引。'
    }
  },
  {
    id: 'moon',
    name: '18. 月亮 (The Moon)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🌙',
    uprightKeywords: ['驚恐迷霧', '不安幻像', '夜間陰影', '謊言與秘', '靈媒覺知'],
    reversedKeywords: ['迷霧散盡', '真相大白', '恐懼平息', '欺騙流產', '走出黑暗'],
    pastInterpretation: {
      upright: '過去經歷了一段充滿多疑、惶惑不決、鬼影重重的靈魂暗夜，常感茫然若失。',
      reversed: '過去在千鈞一髮之際，你漸漸看穿了欺騙和偽裝，重獲清醒和行路的方向感。'
    },
    presentInterpretation: {
      upright: '當前你心中的焦慮感和不安正被潮汐放大。不要相信黑暗中的幻影。此時可能隱藏著他人的秘密。',
      reversed: '心中的迷霧正緩緩退去，你開始恢復冷靜理智，之前一直困擾你的流言蜚語也正在消退。'
    },
    futureInterpretation: {
      upright: '未來的旅伴或旅途中可能會遇到一些隱藏的波濤與難以捉摸的變量，需要發揮深刻的敏銳直覺防微杜漸。',
      reversed: '未來的誤解終將迎來冰釋，疑雲散去，隱藏的對手或背後的算盤都將被赤裸地擺上陽光。'
    }
  },
  {
    id: 'sun',
    name: '19. 太陽 (The Sun)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '☀️',
    uprightKeywords: ['光輝耀眼', '無上繁榮', '真實自信', '神清氣爽', '巨大成功'],
    reversedKeywords: ['光芒短暫受阻', '過度傲慢', '體能透支', '短暫陰翳', '虛張光芒'],
    pastInterpretation: {
      upright: '過去的日子無比明媚，陽光普照。你獲得了矚目的肯定，滿懷歡欣與生命活力。',
      reversed: '過去雖然成果不俗，但你當時感到有一絲悶熱不悅，或是曾因虛榮心過盛而遭到冷血評價。'
    },
    presentInterpretation: {
      upright: '現在正是你最耀眼的黃金時刻！盡情展示你蓬勃真誠的無窮熱量，萬物都將為你送上溫暖祝福。',
      reversed: '當下你能量仍在，但可能暫時被一些瑣碎的不如意給遮擋了視線。保持樂觀，陰霾很快就過。'
    },
    futureInterpretation: {
      upright: '未來前途無可限量！你的事業首創、親密關係在陽光之下都將迎來令世人羨慕的巨大圓滿。',
      reversed: '未來需提防因過於自傲、狂妄表現而招致他人冷眼，或需要注意修補透支嚴重的精神體力。'
    }
  },
  {
    id: 'judgement',
    name: '20. 審判 (Judgement)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🎺',
    uprightKeywords: ['靈魂覺醒', '重大救贖', '因果抉擇', '鳳凰新生', '生命召喚'],
    reversedKeywords: ['拒絕召喚', '良心自責', '一錯再錯', '猶豫不定', '錯過救贖'],
    pastInterpretation: {
      upright: '過去你聽到過命運的重大號角，毅然決然跨过了心靈窄門，重新審視並超越了自我。',
      reversed: '過去當良機來敲門時你因膽怯而作繭自縛，或者深陷在過往的悔疚自責裡裹足不前。'
    },
    presentInterpretation: {
      upright: '你現在正面臨宿命級的因果考核，這是對你所有過去言行的重大考核。請傾聽內心高維的真理召喚。',
      reversed: '你正對某個不言自明的真相採取逃避態度。一味地拖延與推諉，只會使這場靈魂進考難度攀升。'
    },
    futureInterpretation: {
      upright: '未來你將迎來一場沉冤得雪的轉機，或者獲得一次徹底的靈格躍遷，實至名歸。',
      reversed: '未來你將遭遇對過往壞習慣的嚴峻拷問。若不及時痛改前非，極易在因果法則下蒙受沉重打擊。'
    }
  },
  {
    id: 'world',
    name: '21. 世界 (The World)',
    category: 'major',
    categoryLabel: '大阿爾克納 (Major Arcana)',
    symbol: '🌍',
    uprightKeywords: ['全方大圓滿', '功德圓滿', '跨界旅行', '萬物和諧', '完美謝幕'],
    reversedKeywords: ['未完的遺憾', '差一口氣', '旅途受延', '虛幻成功', '原地打轉'],
    pastInterpretation: {
      upright: '過去你成功為某個宏偉的人生重大項目畫上了極為尊貴圓滿的句號，世界臣服你腳下。',
      reversed: '過去曾非常接近夢想，但卻在最關鍵的最後一步留下了令人唏噓不已的缺憾。'
    },
    presentInterpretation: {
      upright: '當前你身處於能量最和諧自足的中心。一切困擾都將消融。你在這一章節已經達成了最高圓滿。',
      reversed: '當前你總覺得生活「還差點什麼」，處在一個九十九度、即將燒開卻沒有沸騰的過渡瓶頸。'
    },
    futureInterpretation: {
      upright: '未來命運將指引你完成大一統的豐功偉業，極致完美的和諧，甚至會涉足跨國、跨界的非凡成就。',
      reversed: '未來可能會面臨一段漫長的拉鋸戰，你需要更多耐心去雕琢邊角以防功虧一簣。'
    }
  }
];

// Suit of Wands: Creativity & Fire (Full 1 to 13)
const WANDS: TarotCard[] = [
  {
    id: 'wand_ace',
    name: '權杖一 (Ace of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🔥',
    uprightKeywords: ['靈感萌芽', '激情澎湃', '計畫開端'],
    reversedKeywords: ['激情消退', '行動受阻', '缺乏動力'],
    pastInterpretation: { upright: '過去一個大膽的創意火花激發了你開疆擴土的豪情。', reversed: '過往曾有名不副實、虎頭蛇尾的項目阻礙了規劃。' },
    presentInterpretation: { upright: '當前極適合開啟全新冒險，拿出突破性的熱忱與意志。', reversed: '你感到精力受阻，或是行事急躁卻苦無明確支點。' },
    futureInterpretation: { upright: '未來將會落定一個充滿創造力與執行力的新篇章。', reversed: '未來需防範流於三分鐘熱度，避免計畫無疾而終。' }
  },
  {
    id: 'wand_two',
    name: '權杖二 (Two of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🌐',
    uprightKeywords: ['遠大規劃', '抉擇路口', '展望未來'],
    reversedKeywords: ['安於現狀', '不願冒險', '規劃不周'],
    pastInterpretation: { upright: '過去你站在長遠戰略發展的起跑點做出關鍵抉擇。', reversed: '過去因害怕未知或缺少遠見，錯失了主動出擊的良機。' },
    presentInterpretation: { upright: '當下你初步掌握核心優勢，正站在決策的十字路口。', reversed: '你正面臨安全感與冒險野心的痛苦拉扯，猶豫不決。' },
    futureInterpretation: { upright: '未來將被賦予更大的主導權，你的規劃將直接塑造版圖。', reversed: '未來需警惕缺乏備用方案，導致踏入陌生領域時失控。' }
  },
  {
    id: 'wand_three',
    name: '權杖三 (Three of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '⛵',
    uprightKeywords: ['開拓版圖', '跨界合作', '前景光明'],
    reversedKeywords: ['目光短淺', '計畫受延', '溝通不暢'],
    pastInterpretation: { upright: '過去你奠定了扎實基礎，以宏觀視野等待豐碩成果。', reversed: '過往曾因不切實際的樂觀或物流阻滯，使出行計畫受壓。' },
    presentInterpretation: { upright: '當前請把眼光投向更廣闊的跨界資源與外部合作。', reversed: '目前遭遇合作意見不一，或者原定拓寬版圖的腳步落空。' },
    futureInterpretation: { upright: '未來你的業務或眼界將能跨越邊界，建立穩定遠征體系。', reversed: '未來需注意外派或出差途中的混亂與溝通延誤，多備方案。' }
  },
  {
    id: 'wand_four',
    name: '權杖四 (Four of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🏰',
    uprightKeywords: ['和諧穩定', '安全感建立', '溫馨慶祝'],
    reversedKeywords: ['內部不和', '表象和諧', '短暫和平'],
    pastInterpretation: { upright: '過去你體驗過一段非常和諧和睦的工作氣氛或家庭溫暖。', reversed: '過去看似穩固的圈子中藏匿著小隔閡，缺乏足夠信任。' },
    presentInterpretation: { upright: '當前你建立起了一個令人安心、充滿成功喜悅的避風港。', reversed: '需妥善處理關係或團隊內部的微小摩擦，防範嫌隙擴大。' },
    futureInterpretation: { upright: '未來你將獲得穩如泰山的事業起點，或成家立業喜事臨門。', reversed: '未來行事需柔化手腕，避免小爭執侵害多年穩固的基底。' }
  },
  {
    id: 'wand_five',
    name: '權杖五 (Five of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '⚔️',
    uprightKeywords: ['爭端混亂', '多方競爭', '腦力激盪'],
    reversedKeywords: ['平息紛爭', '冷戰內耗', '不妥協對抗'],
    pastInterpretation: { upright: '曾經歷過一場利益角逐或充滿多方意見摩擦的喧囂內耗。', reversed: '過去你理智退出了無謂的人際爭端，使自己得以休養。' },
    presentInterpretation: { upright: '當下面對激烈的市場博弈或觀點碰撞，需理性化逆境為智囊。', reversed: '有些不必要的口角正陷入拉鋸，應尋求互讓或戰略撤退。' },
    futureInterpretation: { upright: '未來可能面臨同業強烈競爭，應提升實力以求鶴立雞群。', reversed: '未來的糾紛將迎來理性清盤，此時絕不合適捲入任何渾水。' }
  },
  {
    id: 'wand_six',
    name: '權杖六 (Six of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🏆',
    uprightKeywords: ['凱旋獲勝', '獲得肯定', '信心爆棚'],
    reversedKeywords: ['名不副實', '遭遇嫉妒', '希望落空'],
    pastInterpretation: { upright: '過去曾站上榮耀舞台，並藉此贏得了廣泛認同與信心。', reversed: '曾有過曇花一現的風光，或因陶醉於虛假勝利而招致大意。' },
    presentInterpretation: { upright: '當前處於光鮮奪目的好時節，你的才華和成果得到公眾推崇。', reversed: '雖然表面備受推動，你卻感到名不副實，或正面對一些質疑。' },
    futureInterpretation: { upright: '未來你將高調攻克困境，凱旋回歸並獲得豐厚的名譽資產。', reversed: '未來需保持謙遜踏實，防範高調慶祝引來嫉妒與反噬。' }
  },
  {
    id: 'wand_seven',
    name: '權杖七 (Seven of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🛡️',
    uprightKeywords: ['孤軍堅守', '防衛挑戰', '居高臨下'],
    reversedKeywords: ['力不能支', '妥協退卻', '喪失優勢'],
    pastInterpretation: { upright: '過去你曾在孤立中以一己之力英勇捍衛自身的權益與位置。', reversed: '過往因缺少外援或信心動搖，在競爭壓力下退縮妥協。' },
    presentInterpretation: { upright: '多方攻勢對你的位置虎視眈眈，你佔據天然優勢，請堅守防線。', reversed: '你感到極其被動與疲憊，繁重的指責正試圖壓垮你的尊嚴。' },
    futureInterpretation: { upright: '未來只要你堅持信念，必能擊退種種流言指責，立於不敗之地。', reversed: '未來應提防防線過長，需要提前邀約真誠的同盟協助。' }
  },
  {
    id: 'wand_eight',
    name: '權杖八 (Eight of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '✈️',
    uprightKeywords: ['迅速起飛', '效率驚人', '差旅訊息'],
    reversedKeywords: ['被迫延誤', '衝動出局', '行程受阻'],
    pastInterpretation: { upright: '過去一切在超高效率中飛速前進，多項計畫迅速落地。', reversed: '過去一段時間充溢著低效的反覆、延期，或因衝動行事而失算。' },
    presentInterpretation: { upright: '信息與好契機如流星雨般砸來，請集中精力高效跟進。', reversed: '目前各項進程遭遇不可抗力中斷，行程延誤，消息失真。' },
    futureInterpretation: { upright: '未來商機或戀愛將呈幾何級神速發展，成果瞬間到位。', reversed: '未來需防禦欲速則不達，放緩步調方能避開高空墜落事故。' }
  },
  {
    id: 'wand_nine',
    name: '權杖九 (Nine of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🧱',
    uprightKeywords: ['枕戈待旦', '防範未然', '堅韌意志'],
    reversedKeywords: ['精疲力竭', '防衛過當', '精神過敏'],
    pastInterpretation: { upright: '過去承擔多方壓力依然拖起疲憊身軀構築了最後一重城牆。', reversed: '以前你過度沉浸在防範懷疑中，身心透支最終自我放棄。' },
    presentInterpretation: { upright: '黎明在前，你雖然有些心力交瘁，但請守護好這最後關隘。', reversed: '你現在有些草木皆兵，過強的防範心將真誠的導師拒之門外。' },
    futureInterpretation: { upright: '未來將會有一場精準的耐力防線測試，守護好你的勝利果實。', reversed: '未來要防止因抗拒任何改變，使自己陷入被動而孤立的死胡同。' }
  },
  {
    id: 'wand_ten',
    name: '權杖十 (Ten of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🏋️',
    uprightKeywords: ['大包大攬', '超負荷運轉', '身心俱疲'],
    reversedKeywords: ['主動卸下', '授權分配', '不堪重負'],
    pastInterpretation: { upright: '過去你長期一個人默默承擔了整個項目的龐大生存職責。', reversed: '曾因身體拉警報或心碎至極，無奈捨棄了那些壓抑的重擔。' },
    presentInterpretation: { upright: '你已快到透支的臨界點，別再大包大攬不屬於你的職責。', reversed: '你開始意識到減負的藝術，釋放權利與授權方能走得更遠。' },
    futureInterpretation: { upright: '未來事業規模大成但事務暴增，需未雨綢繆建立專項分流。', reversed: '未來的你需要及時調養，防止被突如其來的繁雜雜碎壓垮身心。' }
  },
  {
    id: 'wand_page',
    name: '權杖侍從 (Page of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🧒',
    uprightKeywords: ['探索好學', '青春活力', '新訊息發布'],
    reversedKeywords: ['做事浮躁', '雷聲大雨點小', '能量停滯'],
    pastInterpretation: { upright: '過去你像個精靈有活力的學徒，興致勃勃開啟了新知摸索。', reversed: '過往曾有不少天馬行空的激情想法，可惜大多三分鐘熱度。' },
    presentInterpretation: { upright: '一項令人激動的新學習、差旅、或體育邀約正在朝你敲門。', reversed: '當下你感到工作枯燥乏味，或你的冒險計畫遭遇了資源短缺。' },
    futureInterpretation: { upright: '未來你將接獲極具成長彈性的挑戰，重燃希望生命力。', reversed: '行事需磨煉定力，避免因過於傲氣偏執而將良緣拒之門外。' }
  },
  {
    id: 'wand_knight',
    name: '權杖騎士 (Knight of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '🐎',
    uprightKeywords: ['說走就走', '熱情冒險', '攻克障礙'],
    reversedKeywords: ['衝動魯莽', '脾氣暴躁', '進展受阻'],
    pastInterpretation: { upright: '過往你雷厲風行、勇氣非凡，長驅直入掃平了核心阻撓。', reversed: '曾因火爆意氣用事或不聽旁人規勉，留下了頗多爛攤子。' },
    presentInterpretation: { upright: '你正渴望用雷霆意志戰勝一切阻隔，充滿雄性或果決力量。', reversed: '當前你做事極易粗暴心急、缺乏耐心，盲目亂衝只會撞牆。' },
    futureInterpretation: { upright: '未來將會有一場高強度的開拓戰役或大遷徙，帶領你高速突圍。', reversed: '未來需提防因後續補給（人際或財政）匱乏，導致孤軍陷入苦戰。' }
  },
  {
    id: 'wand_queen',
    name: '權杖皇后 (Queen of Wands)',
    category: 'wands',
    categoryLabel: '權杖牌組 (Suit of Wands - 火)',
    symbol: '👸',
    uprightKeywords: ['自信果敢', '魅力核心', '樂觀誠懇'],
    reversedKeywords: ['情緒勒索', '專制嫉妒', '自信動搖'],
    pastInterpretation: { upright: '過去你充分彰顯了溫暖奪目的領袖魅力，深受社交群喜。', reversed: '曾因一時的虛榮自尊，或是掌控心太強，與閨蜜或夥伴結怨。' },
    presentInterpretation: { upright: '當下你氣場耀眼、主導力強，站上核心位置展現人格魅力。', reversed: '你感到極度懷疑自身，或身邊有位霸道的強健女性正施壓。' },
    futureInterpretation: { upright: '未來你將能大膽整合核心人脈，獲得社會地位與自豪果實。', reversed: '行事需溫潤周全、和顏悅色，莫用強硬施壓取代真誠的感化。' }
  }
];

// Suit of Cups: Emotions & Water (Full 1 to 13)
const CUPS: TarotCard[] = [
  {
    id: 'cup_ace',
    name: '聖杯一 (Ace of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🥛',
    uprightKeywords: ['愛意充沛', '情感萌芽', '精神療癒'],
    reversedKeywords: ['情感空虛', '自作多情', '關係冷淡'],
    pastInterpretation: { upright: '過去你體會過一場無雜質的純白大愛或直覺洗禮。', reversed: '過去曾深陷愛意的無底索取中，盲目錯付，最後一場空。' },
    presentInterpretation: { upright: '你的心靈圣杯正滿溢而出，極適合談心、冥想或體悟美好。', reversed: '你當前人際枯燥、缺乏熱情，或是付出的真心收到冷漠回絕。' },
    futureInterpretation: { upright: '未來必有高純度的知心善緣或美妙愛情滋潤你的心。', reversed: '需防範過度陷入不靠譜的浪漫泡泡中，醒悟後只有情感透支。' }
  },
  {
    id: 'cup_two',
    name: '聖杯二 (Two of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🥂',
    uprightKeywords: ['雙向奔赴', '默契相親', '契約達成'],
    reversedKeywords: ['溝通斷絕', '心有芥蒂', '合作破裂'],
    pastInterpretation: { upright: '過去曾締結過一項彼此體貼、互相尊重的核心真誠盟約。', reversed: '過往的親密合夥中橫亙著隱秘的不滿，表裡不一，最終冷戰。' },
    presentInterpretation: { upright: '雙方的默契和信任此時達到巔峰，勇敢交心、共謀福祉。', reversed: '你總覺得與重要搭檔的磁場合不上，溝通阻礙重重。' },
    futureInterpretation: { upright: '未來將有望與一位絕佳天賦的夥伴展開強勢而和諧的合作。', reversed: '未來需提防因小偏執引爆信任危機，請用真言取代互相猜忌。' }
  },
  {
    id: 'cup_three',
    name: '聖杯三 (Three of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '👯',
    uprightKeywords: ['共享喜悅', '閨蜜盟友', '歡慶豐盛'],
    reversedKeywords: ['社交流言', '過度耽溺', '關係疏離'],
    pastInterpretation: { upright: '過去曾度過溫馨美好的聚會時光，獲得女性或團體支持。', reversed: '以前混跡在喧鬧的虛偽交際中，熱鬧散去後內心更加淒涼。' },
    presentInterpretation: { upright: '當前極佳組局慶祝、傳遞幸福成果，共享生命和潤。', reversed: '你感到在集體活動中被孤立，或是身邊出現了流言八卦。' },
    futureInterpretation: { upright: '未來項目大成，你將在熱氣騰騰的歡呼中與盟友慶功合影。', reversed: '未來應提防因貪戀享樂或過度吃喝聚餐，耽擱了實踐進度。' }
  },
  {
    id: 'cup_four',
    name: '聖杯四 (Four of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🧘',
    uprightKeywords: ['麻木倦怠', '閉眼冥思', '忽視新機'],
    reversedKeywords: ['走出倦怠', '接納機遇', '行動驚醒'],
    pastInterpretation: { upright: '曾歷經一段意志消沉、主動拒絕各利益好意的幽微沉思期。', reversed: '你曾重整旗鼓，撥開情緒屏障，接納了送上門的極佳新路。' },
    presentInterpretation: { upright: '你對現狀百無聊賴。請警醒！一隻命運之手正遞上全新機遇。', reversed: '你的心靈死水正被激盪破開，重新萌發出外探挑戰的好奇。' },
    futureInterpretation: { upright: '未來若沉迷死水位不做出調整，會讓外部良師益友抱憾作罷。', reversed: '你將打破退縮。你將不畏索然，以全新格局建立起精神地基。' }
  },
  {
    id: 'cup_five',
    name: '聖杯五 (Five of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🥀',
    uprightKeywords: ['沉溺懊悔', '失去之痛', '忽視身後'],
    reversedKeywords: ['創傷癒合', '轉身看路', '希望回歸'],
    pastInterpretation: { upright: '過去身陷重大的後悔與不甘中，一味盯著失去不肯放手。', reversed: '你曾做出勇敢的心理調整，轉身拿起依然屹立的兩個聖杯。' },
    presentInterpretation: { upright: '你陷入受害者思維。其實你身後一直有保底的珍貴資源。', reversed: '最痛苦的一幕已經揭過，你願意面對自責，傷口開始自愈。' },
    futureInterpretation: { upright: '如果一遇挫就悲觀，未來容易陷入被動、怨天尤人的怪圈。', reversed: '命運將助你跟往昔和解，雖然傷痕深刻，但你已重獲堅毅。' }
  },
  {
    id: 'cup_six',
    name: '聖杯六 (Six of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🏡',
    uprightKeywords: ['溫馨故交', '童真善意', '和諧庇護'],
    reversedKeywords: ['沉湎過去', '恐懼長大', '告別童幼稚'],
    pastInterpretation: { upright: '過去曾得故知、長輩溫情款待或在純白世界中獲得療養。', reversed: '曾經對安穩歷史極度依戀，抗拒走向尖銳的成人世界鬥爭。' },
    presentInterpretation: { upright: '當下契機極適合故友叙舊、或是回溯溫馨的家族歷史。', reversed: '你意識到不能總當巨嬰，下定決心直面慘淡的客觀現實。' },
    futureInterpretation: { upright: '漫長的拼搏中，未來將獲得難得的世交助力，溫情托底。', reversed: '不宜用泛濫的舊情牽絆客觀分工。凡事回歸專業方是出路。' }
  },
  {
    id: 'cup_seven',
    name: '聖杯七 (Seven of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '☁️',
    uprightKeywords: ['空中樓閣', '誘惑重重', '缺乏焦點'],
    reversedKeywords: ['戳破幻境', '看清目標', '付諸實踐'],
    pastInterpretation: { upright: '過往曾眼花繚亂於浮華不實的泡沫項目或桃花，皆為虛無。', reversed: '你在一次戳破幻想的暴曬中，及時擺正心態，尋回了真金。' },
    presentInterpretation: { upright: '眼前有眾多天花亂墜的道路，若不果斷收束，你將迷失方向。', reversed: '幻境的肥皂泡正在散去，你開始以無畏的姿態做出專一選拔。' },
    futureInterpretation: { upright: '未來切莫輕信任何不需勞動的高回報承諾，皆有大坑。', reversed: '你將徹底清除思維空想，用踏實的汗水凝聚成真切的實體財富。' }
  },
  {
    id: 'cup_eight',
    name: '聖杯八 (Eight of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '⛰️',
    uprightKeywords: ['轉身離去', '尋求高追求', '告別安逸'],
    reversedKeywords: ['原地踏步', '中途折返', '重回窒息'],
    pastInterpretation: { upright: '在滿月之際，你毅然決然離開了已有的不俗基底，探索靈魂。', reversed: '以前你試圖追逐理想，卻因害怕未知的荒涼而灰溜溜返回牢籠。' },
    presentInterpretation: { upright: '現狀已無法滋補你的精神，即便齊全也是將就。請大膽出走！', reversed: '你對當前的空虛深感苦惱，卻因貪戀微薄的安全感而原地受苦。' },
    futureInterpretation: { upright: '未來將會做出令人矚目的生活大轉型，一刀切斷多餘累積。', reversed: '要預防決心退隱卻半途猶豫，折返只會加劇你意志的內耗。' }
  },
  {
    id: 'cup_nine',
    name: '聖杯九 (Nine of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🍻',
    uprightKeywords: ['得意滿足', '美夢成真', '物質無憂'],
    reversedKeywords: ['得意忘形', '物欲空虛', '防惹非議'],
    pastInterpretation: { upright: '過往心想事成，生活安樂自得，怡然享受了難得的歲月。', reversed: '過往因有些自傲，大肆張揚招惹來了周圍親友內心的不甘。' },
    presentInterpretation: { upright: '當前磁場豐足富常。在自己的花園裡為自己唱首讚歌。', reversed: '縱心神安泰，你心裡卻有種無可言說的孤單，沉湎於感官發洩。' },
    futureInterpretation: { upright: '長久謀劃的藍圖將水乳交融完美落地，收穫百分之百滿意。', reversed: '莫使眼光短淺安逸扼殺了進無能力。舒適區是退化的開端。' }
  },
  {
    id: 'cup_ten',
    name: '聖杯十 (Ten of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🌈',
    uprightKeywords: ['完美和睦', '幸福家庭', '愛意長存'],
    reversedKeywords: ['假面和諧', '家庭失和', '矛盾浮現'],
    pastInterpretation: { upright: '在愛的港灣中，曾與心愛之人或卓越團隊立下神聖承諾。', reversed: '過往曾掩蓋不和，為了外界風評勉力維持著窒息的形式主義。' },
    presentInterpretation: { upright: '彩虹高懸，情感與團隊配合正處在安寧默契之大成。', reversed: '內部觀念產生分歧，應打破安靜，召開一場面對面誠實探討。' },
    futureInterpretation: { upright: '不論經歷多少雨季，未來必將在你的淨土中落實完美安全家。', reversed: '要注意鞏固不可替代的核心親情，别讓小芥蒂演變成大裂谷。' }
  },
  {
    id: 'cup_page',
    name: '聖杯侍從 (Page of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '🐟',
    uprightKeywords: ['感性細膩', '浪漫直覺', '新穎邀請'],
    reversedKeywords: ['情緒起伏', '任性胡鬧', '情感欺騙'],
    pastInterpretation: { upright: '過去一個充滿藝術靈性或感性的柔美訊息開啟了你的心房。', reversed: '曾因大意任性、或者過度依戀表面甜言，在人際中吃足苦頭。' },
    presentInterpretation: { upright: '一封浪漫的書信，或是你的第六感正浮上水面，別忽視了它。', reversed: '你此時處在孩子氣的情緒勒索中，疑心極重，凡事極具受害感。' },
    futureInterpretation: { upright: '預示將會融入一項極具天賦心感天成的全新愛好或遇到知心。', reversed: '未來需切防情感大意，分不清浪漫與欺騙，終落得一廂情願。' }
  },
  {
    id: 'cup_knight',
    name: '聖杯騎士 (Knight of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '💖',
    uprightKeywords: ['溫雅信者', '播撒和平', '美學極致'],
    reversedKeywords: ['逃避現實', '花言巧語', '不靠譜浪子'],
    pastInterpretation: { upright: '過去在熱切理念感召下，你溫柔並追求了高尚的理想。', reversed: '你曾被一位看似深情、實際毫無擔當的情感放電者所拖累。' },
    presentInterpretation: { upright: '你是極具撫慰感的白馬騎士。帶著真誠禮物主動去冰釋嫌隙。', reversed: '需警惕身邊極擅巧舌、無端現慇勤的合作人，對方大有圖謀。' },
    futureInterpretation: { upright: '未來將會迎來一份無懈可擊完美周全的浪漫求婚或商業邀請。', reversed: '不要躲避骨感的日常細節。一切華而不實的大廈終將因缺土倒塌。' }
  },
  {
    id: 'cup_queen',
    name: '聖杯皇后 (Queen of Cups)',
    category: 'cups',
    categoryLabel: '聖杯牌組 (Suit of Cups - 水)',
    symbol: '👑',
    uprightKeywords: ['同理地母', '天通直覺', '和善救濟'],
    reversedKeywords: ['歇斯底里', '精神黑洞', '不安全感'],
    pastInterpretation: { upright: '過去你成功扮演了情感的安全托底者，用無私愛滋養眾人。', reversed: '過往因邊界感太弱、與他人的苦難糾纏不清，活在怨恨中。' },
    presentInterpretation: { upright: '相信你的神奇第六感，此時心智清澈，一切疑惑均能無形化解。', reversed: '你隨時感覺要被痛苦情緒海嘯吞沒，陷入歇斯底里的折磨。' },
    futureInterpretation: { upright: '未來你將在愛和藝術中彰顯大領袖才能，優雅掌控自己的生活。', reversed: '未來需牢牢守住情感邊界，適度拒絕不屬於自已的眼淚。' }
  }
];

// Suit of Swords: Intellect & Air (Full 1 to 13)
const SWORDS: TarotCard[] = [
  {
    id: 'sword_ace',
    name: '寶劍一 (Ace of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🗡️',
    uprightKeywords: ['心智突圍', '真相大白', '決裂突破'],
    reversedKeywords: ['腦力混亂', '言辭傷人', '方案卡死'],
    pastInterpretation: { upright: '過去你發揮驚人的思維冷靜，一刀斬斷了割不開的死結。', reversed: '過往一項大決策因缺少詳盡的數據依據，落下了重大爛尾。' },
    presentInterpretation: { upright: '拋棄不靠譜的感情用事。用硬邏輯與不可辯駁的事實去戰鬥。', reversed: '你此時大腦過熱、講話有些毒舌傷人，不合適做出關鍵抉擇。' },
    futureInterpretation: { upright: '未來必有撥雲見日、讓人拍案叫絕的黃金核心問題洞穿方案。', reversed: '行事需柔和，若一味要用武力強勢降人，會落下不快。' }
  },
  {
    id: 'sword_two',
    name: '寶劍二 (Two of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🙈',
    uprightKeywords: ['逃避僵持', '難下決策', '表面和平'],
    reversedKeywords: ['蒙眼布摘下', '直面真相', '破冰談判'],
    pastInterpretation: { upright: '過去你為了討好兩方，矇住眼睛把自己困在死胡同裝死。', reversed: '煎熬多時後，你終被迫扯下眼罩，與殘酷的事實直接交鋒。' },
    presentInterpretation: { upright: '你在兩個方案與利益前畏首畏尾，自我隔離。逃避不能根治。', reversed: '你拒絕再做鴕鳥。心智正在歸位，下定決心撥開戰局迷霧。' },
    futureInterpretation: { upright: '未來若不提前理順合同與分工，極可能再次落入合作死局。', reversed: '未來冰封的利益暗牆將破冰融化，一切終能迎來冷靜了斷。' }
  },
  {
    id: 'sword_three',
    name: '寶劍三 (Three of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '💔',
    uprightKeywords: ['痛徹心扉', '承諾背叛', '悲傷失落'],
    reversedKeywords: ['痛漸漸止', '心靈重建', '壓抑痛苦'],
    pastInterpretation: { upright: '過去曾經遭遇過一記毫無防備的信任碎裂，心如刀割。', reversed: '一場壓抑多年的內心撕裂慢慢結痂，你正摸索康復。' },
    presentInterpretation: { upright: '現在有殘忍的真理橫在眼前打破了幻境。迎接痛是復原起點。', reversed: '你強顏歡笑，用多工作壓抑痛楚，這反而使精神更易透支。' },
    futureInterpretation: { upright: '未來行事切記防微杜漸，不要全盤掏心掏肺，凡事留有備手。', reversed: '風雨必將退去，傷痕會成為你未來歲月不可戳破的神經骨架。' }
  },
  {
    id: 'sword_four',
    name: '寶劍四 (Four of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🛏️',
    uprightKeywords: ['閉關休整', '養精蓄銳', '暫不爭論'],
    reversedKeywords: ['驚醒上崗', '重回戰線', '疲憊重啟'],
    pastInterpretation: { upright: '在經歷大博弈後，你曾低調靜修，將身心徹底與塵囂隔離。', reversed: '你曾重整心神，即便身心尚未痊癒，依然強撐踏回戰場。' },
    presentInterpretation: { upright: '現在不宜冒進，關掉手機與電腦，做一個徹頭徹尾的心靈深眠。', reversed: '沉寂多時的狀態結束，你感覺到血液中鬥志復甦，再度回戰。' },
    futureInterpretation: { upright: '未來的你必需要學會在火花四濺的競爭中尋覓戰術調養窗。', reversed: '未來將會被意外推入第一現場，此時務必將你的防線養護好。' }
  },
  {
    id: 'sword_five',
    name: '寶劍五 (Five of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🩹',
    uprightKeywords: ['兩敗俱傷', '慘勝而退', '背後議論'],
    reversedKeywords: ['放棄爭鬥', '兩敗彌合', '人際破產'],
    pastInterpretation: { upright: '過去拼死護存尊嚴贏了辯論，卻在冷酷中失去了同盟溫暖。', reversed: '你曾極富戰略智慧地主動退出毫無底線與價值的口水戰。' },
    presentInterpretation: { upright: '你深陷與親友或對手的意氣紛爭。爭個輸贏毫無商業價值，停手！', reversed: '你對當前的勾心鬥角和相互內耗深惡痛絕，正在設法體面退局。' },
    futureInterpretation: { upright: '未來防範惡性的職場算計或惡言相向，不可將脆弱面漏出。', reversed: '所有的惡語相向在未來將草草了結，不予置喙方是上策。' }
  },
  {
    id: 'sword_six',
    name: '寶劍六 (Six of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🚣',
    uprightKeywords: ['平穩度過', '低調過渡', '心傷癒合'],
    reversedKeywords: ['卡死泥潭', '抗拒療愈', '計畫生變'],
    pastInterpretation: { upright: '驚濤駭浪後，你載著未拔出的寶劍，平穩駛向安全避風港。', reversed: '曾試圖遮掩核心難題和稀泥，致使舊痛在半路再次爆發。' },
    presentInterpretation: { upright: '局勢雖然清淡，但一直在朝溫和好轉的方向擺渡。別亂陣腳。', reversed: '你過度執著於當年的心碎，死抓不放，拒絕了康復過度路。' },
    futureInterpretation: { upright: '未來將有望獲得平順舒心的安魂過渡、搬家或順利轉行。', reversed: '長途外拓恐遭遇不測阻隔，切忌在心理重壓期制定關鍵行程。' }
  },
  {
    id: 'sword_seven',
    name: '寶劍七 (Seven of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🦊',
    uprightKeywords: ['走捷徑計謀', '戰術轉移', '避開正面'],
    reversedKeywords: ['計謀揭穿', '坦誠直面', '心裡不安'],
    pastInterpretation: { upright: '過去靈活規避了浩大衝突，透過非標準手段巧取了果實。', reversed: '曾因大意走邊界擦邊球，最終事情暴露蒙受了信譽損失。' },
    presentInterpretation: { upright: '小心身邊有小動作，或者是你正絞盡腦汁想要投機取巧。', reversed: '不願再玩捉迷藏遊戲。你開始主動將一切合同和帳目攤開說明。' },
    futureInterpretation: { upright: '未來絕不合適走灰色規則，所有談判務必遵循白紙黑字規範。', reversed: '走捷徑埋下的定时炸彈未來很可能爆開，唯正直方能保泰。' }
  },
  {
    id: 'sword_eight',
    name: '寶劍八 (Eight of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🕸️',
    uprightKeywords: ['劃地自限', '作繭自縛', '其实有路'],
    reversedKeywords: ['解脫束縛', '豁然開朗', '尋求自救'],
    pastInterpretation: { upright: '因太在意他人的非議，將自己關在寶劍高牆中，坐以待斃。', reversed: '過往你意識到周遭繩索其實很是鬆垮，一抬腳便獲得解脫。' },
    presentInterpretation: { upright: '你在自我催眠「毫無辦法」，蒙住眼大哭。實際上出路就在腳下。', reversed: '反向抗爭，試圖擊碎自設框架，向不可理喻的約束挑戰。' },
    futureInterpretation: { upright: '不宜被虛構的恐懼蒙蔽。若一味畏首畏尾，未來寸步難行。', reversed: '你的心智即將大爆發，以極致的勇氣挑落束縛，贏回自由。' }
  },
  {
    id: 'sword_nine',
    name: '寶劍九 (Nine of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🦉',
    uprightKeywords: ['深度焦慮', '噩夢失眠', '自我折磨'],
    reversedKeywords: ['噩夢驚醒', '走出焦慮', '心靈安泰'],
    pastInterpretation: { upright: '曾有無數個深夜被噩夢般未發生的災難折磨得徹夜不眠。', reversed: '在最絕望的心碎深夜成功觸底，釋放眼淚後重獲堅韌魄力。' },
    presentInterpretation: { upright: '你正活在大腦所虛構的災難影中。告訴自己：都是假的！', reversed: '焦慮重霧開始退潮，你主動打破自閉，向外界伸出求助之手。' },
    futureInterpretation: { upright: '未來行事如果不控管緊繃，容易因神經過敏而做出崩潰大錯。', reversed: '任憑坎坎坷坷，你終能降伏心魔，心無掛礙自然泰山崩不驚。' }
  },
  {
    id: 'sword_ten',
    name: '寶劍十 (Ten of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '💀',
    uprightKeywords: ['大勢已去', '慘遭重創', '絕處逢生'],
    reversedKeywords: ['緩慢甦醒', '觸底反彈', '迴光返照'],
    pastInterpretation: { upright: '過去如背插十劍的傷者，經受了毀滅性的決策破產。', reversed: '曾身處在萬劫不復的邊緣，在殘酷黑夜中頑強甦醒重建。' },
    presentInterpretation: { upright: '已是最爛田地，無法逆轉。好消息是由此去任何一步皆是上升。', reversed: '你正一點一滴爬出谷底，經歷了致命一劫，你的主頻重置。' },
    futureInterpretation: { upright: '大忌對早已名存實亡的關係或死項目捨不得，必須徹底了斷。', reversed: '未來將會迎來徹底清明。餘霜消散，生命真正重在向陽綻放。' }
  },
  {
    id: 'sword_page',
    name: '寶劍侍從 (Page of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🕵️',
    uprightKeywords: ['好奇敏銳', '警惕偵察', '搜集情報'],
    reversedKeywords: ['口無遮攔', '多疑過慮', '虛假八卦'],
    pastInterpretation: { upright: '過去像個極具好奇心的偵探，從細碎的蛛絲馬跡中分析動向。', reversed: '以前曾捲入頗多無厘頭的言辭爭端，被流言徹底牽引走。' },
    presentInterpretation: { upright: '此時極其合適高強度學習或冷靜捕捉可能對手背後的戰略。', reversed: '你感到過度緊繃焦躁，甚至在打聽別人隱私，顯得幼稚被動。' },
    futureInterpretation: { upright: '未來將接獲一份極具大腦考驗的優秀戰略挑戰，大放異彩。', reversed: '注意防範因粗心大意导致合約、資料洩密，凡事需保留底牌。' }
  },
  {
    id: 'sword_knight',
    name: '寶劍騎士 (Knight of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '🌪️',
    uprightKeywords: ['思想颶風', '雷霆手段', '攻其必救'],
    reversedKeywords: ['失控翻車', '言語暴虐', '計畫流產'],
    pastInterpretation: { upright: '過去你一馬當先，用狂飆的聰慧和實幹一舉撕碎了阻力。', reversed: '曾有一場超高速的決策崩塌與翻車，因專橫不恤引火自焚。' },
    presentInterpretation: { upright: '颶風正起。拋去條條框框。用最犀利、極致的戰術攻破死水。', reversed: '有些剎車失靈。你正面對巨大的焦躁與狂傲，速速減防否則翻車。' },
    futureInterpretation: { upright: '未來必有一場高水準智商大博弈，你的犀利能全盤制敵。', reversed: '凡事若缺少長遠的深谋遠慮、全憑意氣用事，極易高空失重坠落。' }
  },
  {
    id: 'sword_queen',
    name: '寶劍皇后 (Queen of Swords)',
    category: 'swords',
    categoryLabel: '寶劍牌組 (Suit of Swords - 風)',
    symbol: '👑',
    uprightKeywords: ['高風亮節', '絕對客觀', '言出法隨'],
    reversedKeywords: ['尖酸刻薄', '冰冷無同理', '心理創傷'],
    pastInterpretation: { upright: '過往展現了最極致的神經理智，大悲大苦後浴火重生。', reversed: '曾因講話不留餘地，將最愛你、溫厚忠實的伴侶刺傷。' },
    presentInterpretation: { upright: '收起所有的感性幻想。發揮你手術刀般的智慧快刀斬麻。', reversed: '你將自己埋入冰牆用毒舌回擊靠近的人，活在幽暗創傷防禦。' },
    futureInterpretation: { upright: '未來你將成為某核心領域的公正評判與最崇高的顧問智謀。', reversed: '未來行事需柔而有情，若一味傲慢刻板，易落得晚景煢煢。' }
  }
];

// Suit of Pentacles: Career & Earth (Full 1 to 13)
const PENTACLES: TarotCard[] = [
  {
    id: 'pentacle_ace',
    name: '星幣一 (Ace of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🪙',
    uprightKeywords: ['財富種子', '實用踏實', '新可靠商機'],
    reversedKeywords: ['漏失資產', '預算超標', '眼高手低'],
    pastInterpretation: { upright: '過去播下一顆絕佳務實的商業種子，為當前奠定厚重地基。', reversed: '曾面對極高的賺錢契機卻未能捉牢，因隨意開支而流失。' },
    presentInterpretation: { upright: '好運金幣高懸，此時最宜投資核心技能、夯實身心基建。', reversed: '內心極度沒有物質底氣，理財容易陷入賭博心態，保守為要。' },
    futureInterpretation: { upright: '未來必將獲得令人踏實安心的長效穩定財富、或穩固事業約。', reversed: '行事需小心因貪圖快速而落入欺詐圈套，回歸實業萬無一失。' }
  },
  {
    id: 'pentacle_two',
    name: '星幣二 (Two of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🤹',
    uprightKeywords: ['多工平衡', '靈活騰挪', '流動適應'],
    reversedKeywords: ['混亂失衡', '拆東牆補西牆', '精力崩散'],
    pastInterpretation: { upright: '曾在沉重預算與責任中靈活長袖善舞，勉強維持了平衡。', reversed: '以前曾有一段狼狽不堪、債務交疊極其難堪的騰挪尷尬期。' },
    presentInterpretation: { upright: '你身兼數職，在多重重任中跳起平衡之舞，保持好彈性适應。', reversed: '你正瀕臨失控邊緣，過多零散的開銷與壓力讓你身心無力。' },
    futureInterpretation: { upright: '未來充滿靈感的機遇，你將在優質副業或工作中如魚得水。', reversed: '理財切忌大開槓桿泡沫，及時剪除多餘的不切實際的排場費。' }
  },
  {
    id: 'pentacle_three',
    name: '星幣三 (Three of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🧱',
    uprightKeywords: ['專業合作', '匠心建造', '初具規模'],
    reversedKeywords: ['合作不悅', '專業不足', '草率返工'],
    pastInterpretation: { upright: '曾得資深大師指點，與靠譜同盟為項目打造了精兵藍圖。', reversed: '曾因合作分工不和合、各說各話導致工程留下了嚴重代價。' },
    presentInterpretation: { upright: '虛心接納權威大師的寶貴提議，打通分工壁壘，推動物質。', reversed: '你對合作方或同僚的敷衍應付極其不滿，急需對齊工作標準。' },
    futureInterpretation: { upright: '未來你的專業實力將獲高水平肯定，取得重大的實打實訂單。', reversed: '凡事若不及早落實詳細規範，未來交割可能演變成扯皮泥淖。' }
  },
  {
    id: 'pentacle_four',
    name: '星幣四 (Four of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🔒',
    uprightKeywords: ['保本守成', '防禦資產', '不願改變'],
    reversedKeywords: ['開始放手', '觀念突破', '開支漏洞'],
    pastInterpretation: { upright: '過往視金如命守衛著小小成就，安分守己抗拒著一切波盪。', reversed: '你曾痛下決心破除守財固執，學會把手中的金幣分享出去。' },
    presentInterpretation: { upright: '雖有一定安全感但生活已成死水。緊抓不放也拒絕了成長。', reversed: '你開始懂得一味捂緊錢包沒用，正摸索更大格局的資本投資。' },
    futureInterpretation: { upright: '未來事業將行保守大本營方略，牢守你的底牌，平穩度關。', reversed: '需提防因過於小氣自私、不分利於團隊，導致骨幹憤然改投。' }
  },
  {
    id: 'pentacle_five',
    name: '星幣五 (Five of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '❄️',
    uprightKeywords: ['落難窘迫', '身心孤立', '有隱藏光'],
    reversedKeywords: ['困境好轉', '重獲溫暖', '健康復原'],
    pastInterpretation: { upright: '過去曾有一段時間遭遇雪地難行，經歷深刻經濟理財考驗。', reversed: '你終於走出漫長的雪盲與拮据，找到了溫暖的自救港口。' },
    presentInterpretation: { upright: '此時你感到正站在冰天雪地中，其實周圍有溫暖救贖的光芒。', reversed: '最嚴酷的一月已去，一筆小預算或健康貴人正朝你溫心走來。' },
    futureInterpretation: { upright: '若一味好面子、好空談消費，容易在大環境降溫時猝不及防。', reversed: '你將在淬煉中長出極致抗寒意志與防禦厚牆，未來屹立不倒。' }
  },
  {
    id: 'pentacle_six',
    name: '星幣六 (Six of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '⚖️',
    uprightKeywords: ['慷慨救助', '資源共濟', '公平回報'],
    reversedKeywords: ['虛偽施捨', '債務勒索', '分配不均'],
    pastInterpretation: { upright: '最難關頭，幸運接獲了高階長輩極具尊嚴、精準的幫助。', reversed: '曾遭遇過居高臨下、不禮貌的施捨，活在被控制的陰暗中。' },
    presentInterpretation: { upright: '目前處於資源良性循環的融洽鏈中。按契約精神公道處事。', reversed: '小心有人試圖用些許恩情或小款項對你的自由身心道德綁架。' },
    futureInterpretation: { upright: '未來將落定一項極其公允、回報持久與互惠的頂級長期契約。', reversed: '分配核心利益或獎金時極易引發摩擦，務必親兄弟明算帳。' }
  },
  {
    id: 'pentacle_seven',
    name: '星幣七 (Seven of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🍇',
    uprightKeywords: ['耐心评估', '長線籌備', '等待凝聚'],
    reversedKeywords: ['拔苗助長', '長項目夭折', '投資焦慮'],
    pastInterpretation: { upright: '你在辛勞耕耘後，克制住收穫焦慮，沉穩評估是否續投。', reversed: '過往因過於浮躁，在中途大砍大改戰略，致使成熟長效折戟。' },
    presentInterpretation: { upright: '葡萄還在慢慢孕育甜度，此時只需做好評查工作，不宜收网。', reversed: '你內心極度想一口抱個大胖子，這種拔苗作風會毀了根基。' },
    futureInterpretation: { upright: '未來若堅信長線耕作，必能抱回令人驚喜、堆不下的長效資產。', reversed: '未来大忌缺乏戰略定力把成熟项目賤賣，守得雲開方見月明。' }
  },
  {
    id: 'pentacle_eight',
    name: '星幣八 (Eight of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🔨',
    uprightKeywords: ['工匠精神', '技能修煉', '日積月累'],
    reversedKeywords: ['敷衍草率', '好高騖遠', '粗製濫造'],
    pastInterpretation: { upright: '過去你默默修行、耐得住千篇一律，練就了一身過硬手藝。', reversed: '過去你做事總想著投機，基本功不夠厚重，遇到了技術瓶頸。' },
    presentInterpretation: { upright: '這是心無旁騖鑽研技術、雕刻細節的黃金期。重複即是力量。', reversed: '產生了深度職業倦怠，敷衍行事很容易在不經意間砸了飯碗。' },
    futureInterpretation: { upright: '未來你將成細分市場頂配老專家，作品與服務將帶來安穩錢。', reversed: '不宜投機，凡事以誠，只要基礎不牢，大廈未來必有裂縫。' }
  },
  {
    id: 'pentacle_nine',
    name: '星幣九 (Nine of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🕊️',
    uprightKeywords: ['物質大富', '自律高尚', '優雅獨立'],
    reversedKeywords: ['表裡不一', '物欲支配', '依附他人'],
    pastInterpretation: { upright: '過往靠超常自律與經營過上一段讓人欣羨的優雅首富時光。', reversed: '曾身處在看似奢華、實質全靠攀附或惡性借卡得來的虛浮中。' },
    presentInterpretation: { upright: '當前你磁場豐饒、生活富美，給予了自己最優雅的犒勞放鬆。', reversed: '深陷盲目攀比，為維持外人眼裡的高大上，承受著掏空焦慮。' },
    futureInterpretation: { upright: '未來將會步入真正的財務、生活與心智超級大自由、大掌控。', reversed: '行事需真誠自負盈虧。切忌借用奢華裝點，唯有料方得泰安。' }
  },
  {
    id: 'pentacle_ten',
    name: '星幣十 (Ten of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🏰',
    uprightKeywords: ['百年傳承', '豪門基業', '極致圓滿'],
    reversedKeywords: ['繼承波折', '表裡不一', '家庭失和'],
    pastInterpretation: { upright: '在家族和睦或長期資產的雄厚紅利庇護中，過得舒適安泰。', reversed: '以前在看似和氣的家庭中，曾為錢財利益產生過不少齬齬。' },
    presentInterpretation: { upright: '家族或事業處在極致健全繁盛期，你有能力為同僚托底。', reversed: '表面風和日麗，內部在財務或公司治理上面臨轉型的掣肘。' },
    futureInterpretation: { upright: '未來你將會把手頭的小生意慢慢拼圖、凝聚成浩瀚堅固帝國。', reversed: '未來一定要維持好你的核心血緣與團隊情感，莫因利傷情。' }
  },
  {
    id: 'pentacle_page',
    name: '星幣侍從 (Page of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '💼',
    uprightKeywords: ['求真好問', '踏實學徒', '務實起頭'],
    reversedKeywords: ['做事浮躁', '眼高手低', '投機取巧'],
    pastInterpretation: { upright: '以前你以最老實學徒姿態融入了首份業務，謙遜鑽研。', reversed: '過往有些好逸惡勞，只夢想一步登天、吃了缺少基本功的悶虧。' },
    presentInterpretation: { upright: '這是一段虛心學習打牢底層業務的絕佳黃金開源起頭階段。', reversed: '嫌日常小事瑣碎、沒大志。若不想踏實實踐，夢想只是空談。' },
    futureInterpretation: { upright: '經過穩紮穩打磨練，一個看似不值錢的小生意未來大有收益。', reversed: '不宜走任何擦邊涉險路，防止引官司，老老實實乃萬全。' }
  },
  {
    id: 'pentacle_knight',
    name: '星幣騎士 (Knight of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '🚜',
    uprightKeywords: ['沉穩守諾', '老實耕耘', '值得託付'],
    reversedKeywords: ['墨守成規', '死守陳腐', '前進受阻'],
    pastInterpretation: { upright: '以前信守諾言、忍受單調，在自個田地裡默默精耕細作。', reversed: '因太害怕風險死死把守住被淘汰的老條例，失去了轉新高。' },
    presentInterpretation: { upright: '不需要任何的裝模作樣。帶上最扎實、無可置疑的方案前進。', reversed: '你感到枯燥繁雜，像頭陷入泥坑的老牛。瞎折腾只會陷得深。' },
    futureInterpretation: { upright: '未來將會打造堅如磐石的個人極品信譽，資產穩步堆高。', reversed: '未來行事切記不要過度頑固不靈，唯有適度擁抱創機方可解困。' }
  },
  {
    id: 'pentacle_queen',
    name: '星幣皇后 (Queen of Pentacles)',
    category: 'pentacles',
    categoryLabel: '星幣牌組 (Suit of Pentacles - 土)',
    symbol: '👑',
    uprightKeywords: ['溫暖地母', '和善打理', '事業家兼顧'],
    reversedKeywords: ['猜疑心安', '囤積焦慮', '守財奴印'],
    pastInterpretation: { upright: '過去你打理得事業與家庭井井有條，是核心的溫暖支撐點。', reversed: '以前大意猜忌，在理財利益等交往中與好夥伴關係破裂。' },
    presentInterpretation: { upright: '生活磁場飽滿美好。主動回饋鄰里好友、親近花蟲樹木。', reversed: '你正面對嚴重的安全感缺失、胡亂花實或一味摳門囤積。' },
    futureInterpretation: { upright: '未來的你必能將各家庭和事業大任經營得令人讚嘆，富泰安泰。', reversed: '行事需注意，一味幫涉下屬或子女擦屁股反而容易阻礙其大成。' }
  }
];

// Combine all cards grouped for select menus
export const ALL_TAROT_CARDS: TarotCard[] = [
  ...MAJOR_ARCANA,
  ...WANDS,
  ...CUPS,
  ...SWORDS,
  ...PENTACLES
];

export function getTarotCardById(id: string): TarotCard | undefined {
  return ALL_TAROT_CARDS.find(c => c.id === id);
}
