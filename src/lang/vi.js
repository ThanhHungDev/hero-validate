module.exports = {
  required     : ":name bắt buộc nhập.",
  min          : ":name phải lớn hơn hoặc bằng :min.",
  max          : ":name phải nhỏ hơn hoặc bằng :max.",
  between      : ":name phải nằm trong khoảng :from và :to.",
  checked      : ":name phải được checked",
  array        : ":name phải là mảng",
  object       : ":name phải là object",
  boolean      : ":name phải là đúng/sai.",
  numeric      : ":name chỉ có thể chứa ký tự số.",
  alpha_numeric: ":name chỉ có thể chứa ký tự số và ký tự alphabet(a-z).",
  alpha_dash   : ":name chỉ có thể chứa ký tự alphabet(a-z) và dấu gạch ngang (-).",
  alpha        : ":name chỉ có thể chứa ký tự alphabet(a-z).",
  email        : ":name phải là mail hợp lệ",
  phone        : ":name phải là một số điện thoại hợp lệ.",
  in_array     : ":name chưa chính xác",
  not_in       : ":name có giá trị được chọn không hợp lệ.",
  json         : ":name phải là định dạng json",
  ip           : ":name phải là định dạng địa chỉ ip.",
  url          : ":name phải là định dạng đường dẫn url",
  equals       : ":name phải bằng :value",
  not_equals   : ":name không bằng :value",
  contains_one : ":name phải chứa \":value_to_contain\"",
  contains_all : ":name phải chứa \":value_to_contain\"",
  starts_with  : ":name phải bắt đầu bằng :prefix",
  ends_with    : ":name phải kết thúc bằng :suffix",
  date         : ":name phải là định dạng ngày tháng năm",
};












// {
//   accepted: ':attribute phải được chấp nhận.',
//   alpha: 'Trường :attribute phải là ký tự',
//   alpha_dash: ':attribute chỉ chấp nhận ký tự chữ cái, số, dấu gạch chéo và gạch dưới.',
//   alpha_num: ':attribute phải là ký tự chữ cái hoặc chữ số.',
//   between: ':attribute phải nằm trong khoảng :min và :max.',
//   confirmed: ':attribute xác nhận không trùng khớp.',
//   email: ':attribute không phải là email.',
//   date: ':attribute không phải là ngày hợp lệ',
//   def: 'Thuộc tính :attribute có lỗi.',
//   digits: ':attribute phải là số và có chiều dài bằng :digits.',
//   digits_between: 'Độ dài của trường :attribute phải nằm trong khoảng :min and :max chữ số.',
//   different: 'Giá trị của hai trường :attribute và :different phải khác nhau.',
//   in: 'Giá trị được chọn của :attribute không hợp lệ.',
//   integer: ':attribute phải là số nguyên.',
//   hex: 'The :attribute should have hexadecimal format',
//   min: {
//     numeric: ':attribute phải lớn hơn hoặc bằng :min.',
//     string: ':attribute phải có ít nhất :min ký tự.'
//   },
//   max: {
//     numeric: ':attribute phải nhỏ hơn hoặc bằng :max.',
//     string: ':attribute phải có ít hơn :max ký tự.'
//   },
//   not_in: 'Giá trị được chọn của trường :attribute không hợp lệ.',
//   numeric: ':attribute phải là số.',
//   present: 'Trường :attribute phải có mặt (nhưng có thể để trống).',
//   required: ':attribute bắt buộc nhập.',
//   required_if: ':attribute là bắt buộc khi :other có giá trị :value.',
//   same: 'Giá trị của :attribute và :same phải như nhau.',
//   size: {
//     numeric: ':attribute phải có chiều dài của bằng :size.',
//     string: 'Số ký tự của :attribute phải là :size ký tự.'
//   },
//   string: ':attribute không phải là một chuỗi',
//   url: ':attribute không phải là một Url hợp lệ.',
//   regex: ':attribute không đúng định dạng',
//   attributes: {}
// };
