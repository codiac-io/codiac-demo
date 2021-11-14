export enum QueryOperation {
    StartsWith = '$sw_',
    EndsWith = '$ew_',
    Contains = '$cn_',
    InList = '$in_',
    RegExPattern = '$pn_',
    Equals = '',
}
