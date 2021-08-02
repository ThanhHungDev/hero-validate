module.exports = {
    required     : ":nameは必須です。",
    min          : ":nameは:min以上で入力してください。",
    max          : ":nameは:max以下で入力してください。",
    min_length    : ":nameは:min文字以上で入力してください。",
    max_length    : ":nameは:max文字以下で入力してください。",
    between      : ":nameは:from〜:toの間で指定してください。",
    checked      : ":nameをチェックする必要があります",
    array        : ":nameは配列である必要があります",
    object       : ":nameはオブジェクトである必要があります",
    boolean      : ":nameはブール値である必要があります",
    numeric      : ":nameは数値で入力してください。",
    alpha_numeric: ":nameは英数字のみで入力してください。",
    alpha_dash   : ":nameは英字とダッシュと下線のみで入力してください。",
    alpha        : ":nameは英字のみで入力してください。",
    email        : ":nameは正しいメールアドレスを入力してください。",
    phone        : ":nameは有効な電話番号である必要があります。",
    in_array     : "選択された:nameは無効です。",
    not_in       : "選択された:nameは無効です。",
    json         : ":nameはjsonである必要があります",
    ip           : ":nameはIPアドレス形式である必要があります。",
    url          : ":nameは正しいURIを入力してください。",
    equals       : ":nameと:valueは同じでなければなりません。",
    not_equals   : ":nameは:valueと等しくてはなりません",
    // contains_one : ":name phải chứa \":value_to_contain\"",
    // contains_all : ":name phải chứa \":value_to_contain\"",
    starts_with  : ":nameは:prefixで始まる必要があります",
    ends_with    : ":nameは:suffixで終わる必要があります",
    date         : ":nameは正しい日付形式を入力してください",
};


// module.exports = {
//     accepted: ':nameを確認してください。',
//     after: ':nameは:afterより後の日付を入力してください。',
//     after_or_equal: ':nameは:after_or_equal以降の日付を入力してください。',
//     alpha: '',
//     alpha_dash: '',
//     alpha_num: '',
//     before: ':nameは:beforeより前の日付を入力してください。',
//     before_or_equal: ':nameは:before_or_equal以前の日付を入力してください。',
//     between: {
//       numeric: '',
//       string: ':nameは:min〜:max文字を入力してください'
//     },
//     confirmed: ':nameは確認が一致しません。',
//     email: '',
//     date: '',
//     def: ':nameは検証エラーが含まれています。',
//     digits: ':nameは:digitsの数字のみで入力してください。',
//     digits_between: ':nameは、:min桁から:max桁にしてください。',
//     different: ':nameと:differentは同じであってはなりません。',
//     in: '選択された:nameは無効です。',
//     integer: ':nameは整数で入力してください。',
//     hex: ':nameは16進数で入力してください。',
//     min: {
//       numeric: '',
//       string: ''
//     },
//     max: {
//       numeric: '',
//       string: ''
//     },
//     not_in: '',
//     numeric: '',
//     present: ':nameを入力してください（空欄も可能です）。',

//     same: ':nameと:sameは同じでなければなりません。',
//     size: {
//       numeric: ':nameは:sizeを入力してください。',
//       string: ':nameは:size文字で入力してください。'
//     },
//     string: ':nameは文字のみで入力してください。',
//     url: '',
//     regex: ':nameの値はパターンにマッチする必要があります。',
//     attributes: {}
//   };