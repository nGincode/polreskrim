<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Report;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class ReportApi extends Controller
{

    public function all(Request $request)
    {
        $action = $request->input('Action');


        $data = [];


        if ($action) {
            $act = '
            <div class="dropdown ms-auto text-end">
                <a class="btn-link" data-bs-toggle="dropdown" aria-expanded="true"><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></a>
                                                            <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end" data-popper-reference-hidden="" style="margin: 0px; position: absolute; inset: 0px auto auto 0px; transform: translate(-160px, 26.4px);">
            ';

            if (in_array('View', $action)) {
                $act .= '<a class="dropdown-item" id="view"  data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg"><i class="fa fa-eye"></i>  View</a>';
            }

            if (in_array('Create', $action)) {
                $act .= '<a class="dropdown-item" id="create" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg" ><i class="fa fa-plus"></i> Create</a>';
            }

            if (in_array('Update', $action)) {
                $act .= '<a class="dropdown-item" id="update" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg"><i class="fa fa-pencil"></i>  Update</a>';
            }

            if (in_array('Delete', $action)) {
                $act .= '<a class="dropdown-item" id="delete" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg" ><i class="fa fa-trash"></i> Delete</a>';
            }
            $act .= '</div></div>';
        }



        foreach (Report::orderBy('id', 'DESC')->get() as $key => $value) {

            if ($value['progres']  === "Proses") {
                $css = 'badge-secondary';
            } elseif ($value['progres']  === "Dihentikan") {
                $css = 'badge-danger';
            } elseif ($value['progres']  === "Berhenti Sementara") {
                $css = 'badge-warning';
            } elseif ($value['progres']  === "Selesai") {
                $css = 'badge-success';
            } else {
                $css = 'badge-primary';
            }

            if ($action) {
                $data[] = [
                    'id' => $value['id'],
                    'users_id' => $value['users_id'],
                    'no' => $value['no'],
                    'tgl' => date('d-M-Y (H:i:s)', strtotime($value['tgl'])),
                    'pelapor' => $value['pelapor'],
                    'kejadian' => $value['kejadian'],
                    'pidana' => $value['pidana'],
                    'terlapor' => $value['terlapor'],
                    'status' => '<span class="badge ' . $css . '">' . $value['progres'] . '</span>',
                    'action' => $act ?? ''
                ];
            } else {
                $data[] = [
                    'id' => $value['id'],
                    'users_id' => $value['users_id'],
                    'no' => $value['no'],
                    'tgl' => $value['tgl'],
                    'pelapor' => $value['pelapor'],
                    'kejadian' => $value['kejadian'],
                    'pidana' => $value['pidana'],
                    'terlapor' => $value['terlapor'],
                ];
            }
        }

        return response()->json(
            [
                'response' => 'success',
                'message' => $data ? 'ok' : 'Not Value',
                'data' => $data
            ],
            200
        );
    }

    public function view(Request $request)
    {
        $id = $request->input('id');

        if ($id) {
            $data = Report::where('id', $id)->first();
            return response()->json(
                [
                    'response' => 'success',
                    'message' => $data ? 'ok' : 'Nothing',
                    'data' => $data
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid'
                ],
                200
            );
        }
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');
        $file = $request->input('file');

        if ($id) {
            if ($file !== "'undefined'") {
                $data = Report::where('id', $id)->first();
                $upload = [];
                foreach (json_decode($data['file'], true) as $key => $value) {
                    if ("'" . $key . "'" !== $file) {
                        $upload[] = $value;
                    }
                }
                if (Report::where('id', $id)->update(['file' => json_encode($upload)])) {
                    return response()->json(
                        [
                            'response' => 'success',
                            'message' => 'Deleted successfully' . $file,
                        ],
                        200
                    );
                } else {
                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  'Database trauble'
                        ],
                        200
                    );
                }
            } else {
                if (Report::where('id', $id)->delete()) {

                    return response()->json(
                        [
                            'response' => 'success',
                            'message' => 'Deleted successfully',
                        ],
                        200
                    );
                } else {
                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  'Database trauble'
                        ],
                        200
                    );
                }
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid'
                ],
                200
            );
        }
    }

    public function update(Request $request)
    {
        $no = $request->input('noUpdate');
        $pelapor = $request->input('pelaporUpdate');
        $kejadian = $request->input('kejadianUpdate');
        $pidana = $request->input('pidanaUpdate');
        $terlapor = $request->input('terlaporUpdate');
        $tindak_lanjut = $request->input('tindak_lanjut');
        $date = $request->input('dateUpdate');
        $progress = $request->input('progress');
        $id = $request->input('id');

        if ($id && $progress && $tindak_lanjut && $pelapor && $kejadian && $pidana && $terlapor && $date && $no) {

            if ($Report = Report::where('id', $id)->first()) {

                $validator = Validator::make(
                    $request->all(),
                    [
                        'file' => 'mimes:jpeg,jpg,png,gif,pdf'
                    ]
                );

                if ($Report['no'] == $no) {
                    $noValidate = $no;
                } else {
                    $str = Report::where('no', $no)->count();
                    if ($str) {
                        return response()->json(
                            [
                                'response' => 'error',
                                'message' =>  'No already used'
                            ],
                            200
                        );
                    } else {
                        $noValidate = $no;
                    }
                }

                if ($noValidate) {
                    if ($validator->fails()) {
                        foreach ($validator->errors()->all() as $message) {

                            return response()->json(
                                [
                                    'response' => 'error',
                                    'message' =>  $message
                                ],
                                200
                            );
                        }
                    } else {

                        if ($request->hasFile('file')) {
                            $files = $request->file('file');
                            $imageName = date('YmdHis')  . '.' . $files->getClientOriginalExtension();
                            $files->move(public_path('uploads/Report'), $imageName);
                            $urlfile = '/uploads/Report/' . $imageName;
                        } else {
                            $urlfile = false;
                        }

                        if ($Report['file']) {
                            $arrayFile = json_decode($Report['file'], true);
                            if ($urlfile) {
                                $fille = json_encode(array_merge($arrayFile, array($urlfile)));
                            } else {
                                $fille = $Report['file'];
                            }
                        }

                        if (Report::where('id', $id)->update([
                            'no' => $no,
                            'pelapor' => $pelapor,
                            'kejadian' => $kejadian,
                            'pidana' => $pidana,
                            'terlapor' => $terlapor,
                            'tindak_lanjut' => $tindak_lanjut,
                            'progres' => $progress,
                            'file' => $fille,
                        ])) {
                            return response()->json(
                                [
                                    'response' => 'success',
                                    'message' => 'Change was successful',
                                ],
                                200
                            );
                        } else {
                            return response()->json(
                                [
                                    'response' => 'error',
                                    'message' =>  'Database trauble'
                                ],
                                200
                            );
                        };
                    }
                }
            } else {
                return response()->json(
                    [
                        'response' => 'error',
                        'message' => 'Request not valid'
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid 1' . $tindak_lanjut
                ],
                200
            );
        }
    }


    public function create(Request $request)
    {

        $id = $request->input('id');
        $no = $request->input('no');
        $date = $request->input('date');
        $pelapor = $request->input('pelapor');
        $kejadian = $request->input('kejadian');
        $pidana = $request->input('pidana');
        $terlapor = $request->input('terlapor');

        if ($no && $id && $pelapor && $kejadian && $pidana && $terlapor && $date) {
            $validator = Validator::make(
                $request->all(),
                [
                    'no' => 'required',
                    'file' => 'mimes:jpeg,jpg,png,gif,pdf'
                ]
            );

            if ($validator->fails()) {
                foreach ($validator->errors()->all() as $message) {

                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  $message
                        ],
                        200
                    );
                }
            } else {
                if (!Report::where('no', $request->input('no'))->count()) {

                    if ($request->hasFile('file')) {
                        $files = $request->file('file');
                        $imageName = date('YmdHis') . '.' . $files->getClientOriginalExtension();
                        $files->move(public_path('uploads/Report'), $imageName);
                        $urlfile =  '/uploads/Report/' . $imageName;
                    } else {
                        $urlfile = '';
                    }

                    if (Report::insert([
                        'users_id' => $request->input('id'),
                        'no' => $request->input('no'),
                        'tgl' => $date,
                        'pelapor' => $request->input('pelapor'),
                        'kejadian' => $request->input('kejadian'),
                        'pidana' => $request->input('pidana'),
                        'terlapor' => $request->input('terlapor'),
                        'file' => json_encode(array($urlfile)),
                        'created_at' => date('Y-m-d H:i:s')
                    ])) {
                        return response()->json(
                            [
                                'response' => 'success',
                                'message' => 'Create successful',
                            ],
                            200
                        );
                    } else {
                        return response()->json(
                            [
                                'response' => 'error',
                                'message' =>  'Database trauble'
                            ],
                            200
                        );
                    };
                } else {
                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  'No already used'
                        ],
                        200
                    );
                }
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid'
                ],
                200
            );
        }
    }
}
