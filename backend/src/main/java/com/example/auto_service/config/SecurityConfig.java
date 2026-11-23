
package com.example.auto_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            SecurityContextRepository contextRepository
    ) throws Exception {

        http
            // Temporary during migration; must be enabled before production
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .securityContext(context ->
                context.securityContextRepository(contextRepository)
            )
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())
            .exceptionHandling(errors ->
                errors.authenticationEntryPoint(
                    (request, response, exception) ->
                        response.sendError(HttpStatus.UNAUTHORIZED.value())
                )
            )
            
            .authorizeHttpRequests(auth -> auth

                // Public admin login
                .requestMatchers(HttpMethod.POST, "/api/admin/login")
                    .permitAll()

                // Admin endpoints
                .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")

                // Only admins can view all customers
                .requestMatchers(HttpMethod.GET, "/api/customers")
                    .hasRole("ADMIN")

                // Only admins can modify inventory
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/parts/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/parts/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/parts/**"
                ).hasRole("ADMIN")

                // Only admins can manage sales
                .requestMatchers("/api/part-sales/**")
                    .hasRole("ADMIN")

                // Only admins can assign or complete repairs
                .requestMatchers(HttpMethod.PUT, "/api/bookings/*/assign")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/bookings/*/start")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.POST, "/api/bookings/*/complete")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.GET, "/api/customers/me")
                    .hasRole("CUSTOMER")

                .requestMatchers(HttpMethod.POST, "/api/customers/login")
                    .permitAll()

                // Temporary until customer authentication is secured
                .anyRequest().permitAll()
            )


            .logout(logout -> logout
                .logoutUrl("/api/admin/logout")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler((request, response, authentication) ->
                    response.setStatus(200)
                )
            );

        return http.build();
    }
    
}
