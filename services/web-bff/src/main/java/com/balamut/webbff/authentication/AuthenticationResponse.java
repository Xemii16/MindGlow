package com.balamut.webbff.authentication;

import com.google.gson.annotations.SerializedName;

public record AuthenticationResponse (

        @SerializedName("access_token") String accessToken,
        @SerializedName("refresh_token") String refreshToken
){
}
