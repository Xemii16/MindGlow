package com.balamut.webbff.authentication;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;

public record AuthenticationResponse (

        @SerializedName("access_token") @JsonProperty("access_token") String accessToken,
        @SerializedName("refresh_token") @JsonProperty("refresh_token") String refreshToken
){
}
